import { HttpException, HttpStatus, Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { ApiResponse } from '../interfaces/response.interface';
import { configService } from '../config/config.service';
import axios from 'axios';

axios.defaults.timeout = 15000;

@Injectable()
export class Helpers {

    /**
     * Sends default JSON resonse to client
     * @param {*} content
     * @param {*} message
     */
    static sendJsonResponse(content: any, message: string): ApiResponse {
        const data = {
            success: true,
            message,
            data: content
        };
        return data;
    }

    /**
     * Sends error resonse to client
     * @param {*} content
     * @param {*} message
     * @param {*} status
     */
    static sendErrorResponse(content: any, message: string, status: string): ApiResponse {
        const data = {
            success: false,
            message,
            data: content
        }

        throw new HttpException(data, HttpStatus[status])
    }

    /** Calculate tax percentage */
    static calculateTaxPercentage(amount: number, percentage: number): number {
        return (Number(percentage) / 100) * amount;
    }

    /**
     * Axios wrapper for post requests
     * @param {string} path
     * @param data
     * @param queryParam
     * @param headers
     * @returns {Promise<any>}
     */
    static async post(path: string, payload: any, queryParam?: {[key: string]: string | number | boolean}, headers?: {[key: string]: string | number | boolean}): Promise<any> {
        try {
            const { data } = await axios.post(path, { params: queryParam, headers, data: payload });
            return data;
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                throw new ServiceUnavailableException('Looks like the server is taking too long to respond, please try again')
            } else {
                throw new InternalServerErrorException('Something went wrong and we\'re working on it. Please try again later')
            }
        }
    }
}
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.0.3.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export class Client {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @return Success
     */
    documentDirectoriesGET(): Promise<DirectoryStructure> {
        let url_ = this.baseUrl + "/api/DocumentDirectories";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDocumentDirectoriesGET(_response);
        });
    }

    protected processDocumentDirectoriesGET(response: Response): Promise<DirectoryStructure> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as DirectoryStructure;
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<DirectoryStructure>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    documentDirectoriesPOST(body: CreateDirectoryCommand | undefined): Promise<DocumentDirectoryDto> {
        let url_ = this.baseUrl + "/api/DocumentDirectories";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDocumentDirectoriesPOST(_response);
        });
    }

    protected processDocumentDirectoriesPOST(response: Response): Promise<DocumentDirectoryDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as DocumentDirectoryDto;
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            result400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ValidationProblemDetails;
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<DocumentDirectoryDto>(null as any);
    }

    /**
     * @param parentDirectoryId (optional) 
     * @return Success
     */
    documentsGET(parentDirectoryId: string | undefined): Promise<GetDocumentListResponse> {
        let url_ = this.baseUrl + "/api/Documents?";
        if (parentDirectoryId === null)
            throw new Error("The parameter 'parentDirectoryId' cannot be null.");
        else if (parentDirectoryId !== undefined)
            url_ += "ParentDirectoryId=" + encodeURIComponent("" + parentDirectoryId) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDocumentsGET(_response);
        });
    }

    protected processDocumentsGET(response: Response): Promise<GetDocumentListResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as GetDocumentListResponse;
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            result400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ValidationProblemDetails;
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<GetDocumentListResponse>(null as any);
    }

    /**
     * @param parentDirectoryId (optional) 
     * @param file (optional) 
     * @return Success
     */
    documentsPOST(parentDirectoryId: string | undefined, file: FileParameter | undefined): Promise<DocumentCreatedResponse> {
        let url_ = this.baseUrl + "/api/Documents";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = new FormData();
        if (parentDirectoryId === null || parentDirectoryId === undefined)
            throw new Error("The parameter 'parentDirectoryId' cannot be null.");
        else
            content_.append("ParentDirectoryId", parentDirectoryId.toString());
        if (file === null || file === undefined)
            throw new Error("The parameter 'file' cannot be null.");
        else
            content_.append("File", file.data, file.fileName ? file.fileName : "File");

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDocumentsPOST(_response);
        });
    }

    protected processDocumentsPOST(response: Response): Promise<DocumentCreatedResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as DocumentCreatedResponse;
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            result400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ValidationProblemDetails;
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<DocumentCreatedResponse>(null as any);
    }

    /**
     * @return Success
     */
    documentsGET2(id: string): Promise<DocumentItemDto> {
        let url_ = this.baseUrl + "/api/Documents/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDocumentsGET2(_response);
        });
    }

    protected processDocumentsGET2(response: Response): Promise<DocumentItemDto> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as DocumentItemDto;
            return result200;
            });
        } else if (status === 400) {
            return response.text().then((_responseText) => {
            let result400: any = null;
            result400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ValidationProblemDetails;
            return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<DocumentItemDto>(null as any);
    }
}

export interface CreateDirectoryCommand {
    name?: string | undefined;
    parentDirectoryId?: string | undefined;
}

export interface DirectoryStructure {
    rootDirectories?: DocumentDirectoryDto[] | undefined;
}

export interface DocumentCreatedResponse {
    id?: string;
}

export interface DocumentDirectoryDto {
    id?: string;
    parentDirectoryId?: string | undefined;
    name?: string | undefined;
    directories?: DocumentDirectoryDto[] | undefined;
}

export interface DocumentItemDto {
    id?: string;
    name?: string | undefined;
    extension?: string | undefined;
    parentDirectoryId?: string;
    data?: string | undefined;
}

export interface DocumentListDto {
    id?: string;
    name?: string | undefined;
    extension?: string | undefined;
    parentDirectoryId?: string;
}

export interface GetDocumentListResponse {
    items?: DocumentListDto[] | undefined;
}

export interface ValidationProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
    errors?: { [key: string]: string[]; } | undefined;

    [key: string]: any;
}

export interface FileParameter {
    data: any;
    fileName: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}
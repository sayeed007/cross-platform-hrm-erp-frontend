export interface Notice {
    id: number;
    noticeTitle: string;
    noticeDescription: string;
    companyId: number;
    uploadedDate: string;
    lastModifiedDate: string | null;
    uploaderId: number;
    uploaderName: string;
    uploadedTime: string;
    lastModifiedTime: string | null;
    attachmentFilePath: string[];
}


export interface NoticeWithMonth {
    id: number;
    noticeTitle: string;
    noticeDescription: string;
    companyId: number;
    uploadedDate: string;
    lastModifiedDate: string | null;
    uploaderId: number;
    uploaderName: string;
    uploadedTime: string;
    lastModifiedTime: string | null;
    attachmentFilePath: string[];
    month: string;
}



export interface CreateLectureDTO {
     title: string;
     moduleId: string;
}

export interface UpdateLectureDTO {
     title: string;
     description: string;
     id: string;
}

export interface CreateDownloadableLectureResourceDTO {
     title: string;
     file: string;
     lectureId: string;
     type: string;
}

export interface CreateExternalResourceDTO {
     title: string;
     url: string;
     lectureId: string;
}

export interface CreateLectureVideoDTO {
     title: string;
     file: string;
     lectureId: string;
     duration: number;
}

export interface CreateLectureArticleDTO {
     title: string;
     body: string;
     lectureId: string;
}

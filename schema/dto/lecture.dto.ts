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

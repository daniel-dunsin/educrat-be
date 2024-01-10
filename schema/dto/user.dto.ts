import { SocialsTypes } from '../enums/socials.enum';

export interface UpdateSocialsDTO {
     type: SocialsTypes;
     url: string;
}
export interface BecomeInstructorDTO {
     userId: string;
     biography: string;
     headline: string;
     socials: UpdateSocialsDTO[];
}

export interface UpdateUserDTO {
     userId: string;
     biography: string;
     headline: string;
}

export interface UpdateProfilePictureDTO {
     userId: string;
     image: string;
}

import { SocialsTypes } from '../enums/socials.enum';

export interface UpdateSocialsDTO {
     type: SocialsTypes;
     url: string;
}
export interface BecomeInstructorDTO {
     userId: string;
     about: string;
     headline: string;
     socials: UpdateSocialsDTO[];
     profilePicture: string;
}

export interface UpdateUserDTO {
     userId: string;
     about: string;
     headline: string;
}

export interface UpdateProfilePictureDTO {
     userId: string;
     image: string;
}

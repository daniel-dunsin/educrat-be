export interface SignUpDTO {
     password: string;
     username: string;
     lastName: string;
     firstName: string;
     email: string;
}

export interface SignInDTO {
     credential: string;
     password: string;
}

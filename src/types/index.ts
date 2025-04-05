// Redux
  export interface ILoginRequest {
    email: string;
    password: string;
  }
  
  export interface IRegisterRequest {
    email: string | undefined;
    username?: string | undefined;
    password: string | undefined;
  }
  
  export interface IUserRequest {
    _id?: number | undefined;
    email: string | undefined;
    username?: string | undefined;
    password: string | undefined;
  }
  
  export interface ILoginProps {
    email: string;
    password: string;
  }
  
  export interface User {
    _id: string;  
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface IUserResponse {
    status: string;
    message: string;
    data: {
      token: string;
      user: User;
    };
  }
  
  export interface VoucherInput {
    label: string;
    name: string;
    _id?: string;
    value?: string; // untuk request create
  }
  
  export interface VoucherOption {
    id: string;
    label: string;
    icon: string;
    price: number;
    type: "normal" | "package";
    _id?: string;
  }
  
  export interface Voucher {
    _id: string;
    name: string;
    image: string;
    variants: {
      id: string;
      label: string;
      icon: string;
      price: number;
      type: "package" | "normal";
    }[];
    inputs: {
      label: string;
      name: string;
    }[];
  }
  
  export interface VoucherResponse {
    status: string;
    message: string;
    data: Voucher[];
  }
  
  export interface CreateVoucherRequest {
    voucherId: string;
    gameName: string;
    voucherImage: string;
    variants: VoucherOption;
    inputs: VoucherInput[];
  }
   
  export interface SelectedInput {
    name: string;
    value: string;
  }
  
  export interface Transaction {
    _id?: string;
    voucherId: string;
    optionId: string;
    selectedInputs: SelectedInput[];
    createdAt?: string;
  }
  
  export interface TransactionResponse {
    status: string;
    data: Transaction[];
  }
  
  export interface CreateTransactionRequest {
    name: string;
    image: string;
    variants: {
      id: string;
      label: string;
      icon: string;
      price: number;
      type: 'normal' | 'package';
    };
    inputs: {
      label: string;
      name: string;
      value: string;
    }[];
  }
  
  
  export interface CreateTransactionResponse {
    status: "success" | "error";
    message: string;
    data: {
      transactionId: string;
      midtransToken: string;
    };
  }

  export interface UpdateTransactionRequest extends CreateTransactionRequest {
    _id: string;
  }
  

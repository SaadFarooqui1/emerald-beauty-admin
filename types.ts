import { FormikErrors, FormikTouched } from "formik";
import { NextPage } from "next";
import React, { ReactNode } from "react";
import { SubModuleType } from "./types/types";

export type campaignsOfCanvasProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    setReminder: React.Dispatch<React.SetStateAction<string>>;
    data: any
}



// Add User Modal Prosp
export type addUserModalProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}




// Add User Modal Prosp
export type addLicenseModalProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessAlertt?: React.Dispatch<React.SetStateAction<boolean>>;
    showSuccessAleert?: boolean,
    data?: any
}


export type upgradePremiumSuccessAlert = {
    setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
    showSuccessAlert: boolean,
    data?: any

}


export type PremiumModalProps = {
    showCustomizer?: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    showModal: boolean;
    setShowCustomizer?: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddLicense: React.Dispatch<React.SetStateAction<boolean>>;

    showAddLicense: boolean,
    data?: any
}





// Edit user Modal Props
export type editModuleModalProps = {
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}



// Edit user Modal Props
export type editSubModuleModalProps = {
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}



// Add Module Modal Prosp
export type addModuleModalProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}



// Add Sub Module Modal Prosp
export type addSubModuleModalProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    main_module_id: string
    module_steps_id: string,
    data?: any
}

// Edit user Modal Props
export type EditSubModuleModalProps = {
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    main_module_id: number
    module_steps_id: number,
    data?: any
}






// Edit Module Modal Props
export type editUserModalProps = {
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}

// Delete Module Modal Props
export type deleteModuleComponentProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}
//


// Add Module Step Modal Prosp
export type addModuleStepModalProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}

// Edit user Modal Props
export type editModuleModalSetpProps = {
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
    main_module_id: number
}


// Delete Module Step Modal Props
export type deleteModuleStepComponentProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}
//



// Delete User Modal Props
export type deleteUserComponentProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}
//
export interface ActionRequestModalComponentProps<T> {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: T
}


export type upgradePackageModalProps = {
    showAddLicense: boolean;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddLicense: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}






export type deleteMyLicenseComponentProps = {
    showDeleteLicenseModal: boolean;
    setShowDeleteLicenseModal: React.Dispatch<React.SetStateAction<boolean>>;
    data?: any
}


export type userData = {
    first_name: string,
    last_name: string,
    email: string,
    type?: string,
    licenses_expiry?: string,
    designation?: string,
    department: [],
}

// Component of user table Props
export type usertableProps = {
    showCustomizer: boolean;
    setShowCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
    showEditUser: boolean;
    setShowEditUser: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    users: userData[]
}

// Add Manager Component props
export type addManagerComponentPorpos = {
    showAddManagerModal: boolean;
    setShowAddManagerModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// Add Manager Component props
export type addDepartmentComponentPorpos = {
    showAddManagerModal: boolean;
    setShowAddManagerModal: React.Dispatch<React.SetStateAction<boolean>>;
}


// Department component Props
export type editDepartmentModalProps = {
    showEditDepartment: boolean;
    setShowEditDepartment: React.Dispatch<React.SetStateAction<boolean>>;
    data: DepartmentsT
}


export interface PrivateRouteProps {
    children: ReactNode;
    authenticate?: NextPage['authenticate'];
    permissions?: NextPage['permissions'];
    roles?: NextPage['roles'];
}


// departments


export interface DepartmentsT {
    id: number;
    name: string;
}


export interface ModulesT {
    id: number;
    name: string;
}
export interface UserDeleteT {
    id: number;
    first_name: string;
    last_name: string;
}

export type UpgradePremiumModalProps = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}



export interface PremiumRequestsI {
    id: number;
    duration: number;
    status: number;
    reason: string;
    created_at: string;
    updated_at: string;
}

export interface AllPremiumRequestsI extends PremiumRequestsI {
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        organization_expiry: string | null;
    }
}



// license


export interface InnerUserI {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    organization_expiry: string | null;
    assigner_expiry: boolean;
}


export interface LicenseI {
    id: number;
    qty: number;
    type: string;
    user_id: number;
    duration: number | null;
    status: number;
    reason: string;
    created_at: string;
    updated_at: string;
    used: number;
}

export interface AssignerLicenseI {
    id: number;
    user_id: number | null;
    license_id: number;
    created_at: string;
    updated_at: string;
    license: LicenseI
}

export interface AllLicenseI extends LicenseI {
    user: InnerUserI
}



// modal
export type ModalTitle = {
    className?: string;
    removeClassName?: boolean;
    text: string;
}

export interface BaseModalPropsT {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface BaseModalProps<T> extends BaseModalPropsT {
    title: ModalTitle;
    Slot: React.FC<T>;
}


export interface BaseDynamicfieldGenrationContentListProps<T = unknown> extends BaseModalPropsT {
    submodule?: SubModuleType,
    options?: T
}




export type UploadedFile = {
    name: string;
    path: string;
    mimetype: string;
}

export type SubBasesT = {
    id: number;
    main_module_id: number;
    module_steps_id: number;
    sub_module_id: number;
    heading: string | null;
    para: string | null;
    media: string | null;
    media_type: string | null;
    description: string | null;
    short_description: string | null;
    status: number;
    other: string | null;
    type: string;
    created_at: string;
    updated_at: string;
}
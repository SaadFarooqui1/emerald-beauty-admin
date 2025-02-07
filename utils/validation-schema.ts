import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

const useValidationSchemaHook = () => {

    const { t } = useTranslation()

    const phoneRegExp =
        /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

    const aboutSchema = Yup.object().shape({
        name: Yup.string().required().label('name'),
        email: Yup.string().required().email().label('Email'),
        msg: Yup.string().required().min(20).label('Message'),
    })

    const reviewSchema = Yup.object().shape({
        name: Yup.string().required().label('Name'),
        email: Yup.string().required().email().label('Email'),
        review: Yup.string().required().min(20).label('Review'),
    })
    // { name: "", email: "", phone: "", gender: "", password: "", re_password: "", city: "", terms_and_conditions: "" }
    const signupSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is a required field')
            .min(5)
            .max(50)
            .label('name'),
        email: Yup.string()
            .required('email is a required field')
            .label('email'),
        phone: Yup.string()
            .matches(phoneRegExp, 'phone number is not valid')
            .required('phone is a required field')
            .min(9, 'phone must be at least 6 characters')
            .max(15, 'phone number max 15 characters')
            .label('phone'),
        gender: Yup.string()
            .required('gender is a required field')
            .label('gender'),
        city: Yup.string()
            .required('city is a required field')
            .label('city'),
        password: Yup.string()
            .min(6, 'phone must be.at least 6 characters')
            .required('password is required'),
        re_password: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'passwords must match')
            .required('confirm.password is required'),
        terms_and_conditions: Yup.string()
            .required('terms & conditions is a required field')
            .label('Terms & Conditions'),
    })

    const signInSchema = Yup.object().shape({
        email: Yup.string()
            .required('email is a required field')
            .email()
            .label('Email'),
        password: Yup.string()
            .required('password is required')
            .min(3, 'password.must at least 3 characters')
            .label('Password'),
    })

    const resetPasswordSchema = Yup.object().shape({
        email: Yup.string()
            .required('email is a required field')
            .email()
            .label('email'),
    })

    const updatePasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'password.must be.at least 6.characters')
            .required('password is required'),
        repeat_password: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'passwords must match')
            .required('confirm password is required'),
    })
    // otp schema
    const otpSchema = Yup.object().shape({
        otp: Yup.number().required('otp required field').label('Otp'),
    })
    const contactSchema = Yup.object().shape({
        name: Yup.string().required().label('Name'),
        email: Yup.string().required().email().label('Email'),
        msg: Yup.string().required().min(20).label('Message'),
    })

    // change passwor schema
    const ChangePasswordSchema = Yup.object().shape({
        old_password: Yup.string().required('old.password is required'),
        new_password: Yup.string()
            .min(6, 'password must be at least 6.characters')
            .required('password is required'),
        repeat_new_password: Yup.string()
            .oneOf([Yup.ref('new_password'), ''], 'passwords must match')
            .required('confirm.password is required'),
    })

    // address validation schema
    const addAddressSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is a required field')
            .min(3)
            .max(10)
            .label('Name'),
        city: Yup.string()
            .required('city is a required field')
            .min(3)
            .max(50)
            .label('City'),
        address_1: Yup.string()
            .required('address field is required.')
            .max(500)
            .label('Address'),
        lat: Yup.number()
            .required(
                'please click the location button to get current address ')

            .label('lat'),
        long: Yup.number()
            .required(
                'please click the location button to get current address ')

            .label('lng'),
        is_default: Yup.number().required('default').label('default'),
    })

    const ContactUsFormSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is a required field')
            .min(3)
            .max(22)
            .label('Name'),
        email: Yup.string()
            .required('email is a required field')
            .max(40)
            .label('Email'),
        phone: Yup.string()
            .required('phone is a required field')
            .max(20)
            .label('Phone'),
        city: Yup.string()
            .required('city is a required field')
            .min(3)
            .max(50)
            .label('City'),
        subject: Yup.string()
            .required('subject is a required field')
            .max(100)
            .label('subject'),
        message: Yup.string()
            .required('message is a required field')
            .max(500)
            .label('Message'),
    })

    const editAddressSchema = Yup.object().shape({
        id: Yup.number().required().label('id'),
        name: Yup.string()
            .required('name is a required field')
            .min(3)
            .max(10)
            .label('Name'),
        city: Yup.string()
            .required('city is a required field')
            .min(3)
            .max(50)
            .label('City'),
        address_1: Yup.string()
            .required('address field is required.')
            .max(500)
            .label('Address'),
        lat: Yup.number()
            .required(
                'please click the location button to get current address ')

            .label('lat'),
        long: Yup.number()
            .required(
                'please click the location button to get current address ')

            .label('lng'),
        is_default: Yup.number().required('default').label('default'),
    })

    // products
    // profileschema
    const profileSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is a required field')
            .min(5)
            .max(50)
            .label('name'),
        phone: Yup.string()
            .matches(phoneRegExp, 'phone number is not valid')
            .required()
            .min(5)
            .max(15)
            .label('phone'),
        gender: Yup.string()
            .required('gender is a required field')
            .label('gender'),
        city: Yup.string()
            .required('city is a required field')
            .label('city'),
    })

    // add review Schema
    const addReviewSchema = Yup.object().shape({
        rating: Yup.number()
            .required()
            .min(1, 'Please Select The Rating.')
            .max(5)
            .label('Rating'),
        reviews: Yup.string()
            .required('Please Fill Message Field.')
            .min(10)
            .max(1000)
            .label('Message'),
    })





    // contact us schema
    const contactUsSchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        description: Yup.string().required(t('errors.Description is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        arabic_description: Yup.string().required(t("errors.Arabic Description is a required field")?.toString()),
        path: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })


    const addCategorySchema = Yup.object().shape({
        name: Yup.string().required(t('errors.Name is a required field')?.toString()),
        arabic_name: Yup.string().required(t('errors.Arabic Name is a required field')?.toString()),
    })




    const addServiceSchema = Yup.object().shape({
        name: Yup.string().required(t('errors.Name is a required field')?.toString()),
        arabic_name: Yup.string().required(t('errors.Arabic Name is a required field')?.toString()),
        description: Yup.string().required(t('errors.Description is a required field')?.toString()),
        arabic_description: Yup.string().required(t('errors.Arabic Description is a required field')?.toString()),
        price: Yup.number().required(t('errors.Price is a required field')?.toString()).min(1, t('errors.Price must be greater than 0')?.toString()),
        duration: Yup.number()
            .typeError(t("errors.Please Select Duration")?.toString())
            .required(t("errors.Please Select Duration")?.toString()),
        category_id: Yup.number()
            .typeError(t("errors.Please select Category")?.toString())
            .required(t("errors.Please select Category")?.toString()),
        image_url: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })


    const addSocialIconsSchema = Yup.object().shape({
        type: Yup.number().typeError(t("errors.Please Select Platform")?.toString())
            .required(t("errors.Please Select Platform")?.toString()),
        url: Yup.string().required(t('errors.Url is a required field')?.toString()),
        icon: Yup.string().required(t('errors.Icon is a required field')?.toString()),
    })


    const addStaffSchema = Yup.object().shape({
        user_name: Yup.string().required(t('errors.User Name is a required field')?.toString()),
        first_name: Yup.string().required(t('errors.First Name is a required field')?.toString()),
        last_name: Yup.string().required(t('errors.Last Name is a required field')?.toString()),
        email: Yup.string().required(t('errors.Email is a required field')?.toString()),
        phone: Yup.string().required(t('errors.Phone is a required field')?.toString()),
        password: Yup.string().required(t('errors.Password is a required field')?.toString()),
        address: Yup.string().required(t('errors.Address is a required field')?.toString()),
        role_id: Yup.number()
            .typeError(t("errors.Please select Role")?.toString())
            .required(t("errors.Please select Role")?.toString()),
        image_url: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })

    const addEmployeeSchema = Yup.object().shape({
        user_name: Yup.string().required(t('errors.User Name is a required field')?.toString()),
        first_name: Yup.string().required(t('errors.First Name is a required field')?.toString()),
        last_name: Yup.string().required(t('errors.Last Name is a required field')?.toString()),
        email: Yup.string().required(t('errors.Email is a required field')?.toString()),
        phone: Yup.string().required(t('errors.Phone is a required field')?.toString()),
        password: Yup.string().required(t('errors.Password is a required field')?.toString()),
        salary: Yup.number().required(t('errors.Salary is a required field')?.toString()),
        service_id: Yup.number()
            .typeError(t("errors.Please select Service")?.toString())
            .required(t("errors.Please select Service")?.toString()),
        category_id: Yup.number()
            .typeError(t("errors.Please select Category")?.toString())
            .required(t("errors.Please select Category")?.toString()),
        shift_start_time: Yup.string().required(t('errors.Shift Start Time is a required field')?.toString()),
        shift_end_time: Yup.string().required(t('errors.Shift End Time is a required field')?.toString()),
        image_url: Yup.string().required(t('errors.Image is a required field')?.toString()),
        document: Yup.string().required(t('errors.Document is a required field')?.toString()),
    })

    const editEmployeeSchema = Yup.object().shape({
        user_name: Yup.string().required(t('errors.User Name is a required field')?.toString()),
        first_name: Yup.string().required(t('errors.First Name is a required field')?.toString()),
        last_name: Yup.string().required(t('errors.Last Name is a required field')?.toString()),
        email: Yup.string().required(t('errors.Email is a required field')?.toString()),
        phone: Yup.string().required(t('errors.Phone is a required field')?.toString()),
        salary: Yup.number().required(t('errors.Salary is a required field')?.toString()).min(1, t('errors.Salary must be greater than 0')?.toString()),
        service_id: Yup.number()
            .typeError(t("errors.Please select Service")?.toString())
            .required(t("errors.Please select Service")?.toString()),
        category_id: Yup.number()
            .typeError(t("errors.Please select Category")?.toString())
            .required(t("errors.Please select Category")?.toString()),
        shift_start_time: Yup.string().required(t('errors.Shift Start Time is a required field')?.toString()),
        shift_end_time: Yup.string().required(t('errors.Shift End Time is a required field')?.toString()),
        image_url: Yup.string().required(t('errors.Image is a required field')?.toString()),
        document: Yup.string().required(t('errors.Document is a required field')?.toString()),
    })

    const addCouponSchema = Yup.object().shape({
        code: Yup.string().required(t('errors.Code is a required field')?.toString()),
        discount: Yup.number().required(t('errors.Discount is a required field')?.toString()).min(1, t('errors.Discount must be greater than 0')?.toString()),
        start_date: Yup.string().required(t('errors.Start Date is a required field')?.toString()),
        end_date: Yup.string().required(t("errors.End Date is a required field")?.toString()),
        services: Yup.array()
            .min(1, t("errors.Please select at least one service")?.toString()) // Ensure that at least one service is selected
            .of(Yup.number()) // Ensure each item in the array is a number
            .required(t("errors.Please select Service")?.toString()),
    })

    // const addRoleSchema = Yup.object().shape({
    //     name: Yup.string().required(t('errors.Role name is a required field')?.toString()),
    //     permissions: Yup.array()
    //         .min(1, t('errors.Please select at least one permission')?.toString())
    //         .required(t('errors.Please select at least one permission')?.toString()),
    // })


    const addNotificationSchema = Yup.object().shape({
        title: Yup.string().required(t('errors.Title is a required field')?.toString()),
        body: Yup.string().required(t('errors.Message is a required field')?.toString()),
        type: Yup.number()
        .required(t('errors.Please Select one type')?.toString()) 
        .min(1, t('errors.Please Select one type')?.toString())  
        .label(t('errors.Please Select one type')?.toString()),
    })
    const addPaymentSchema = Yup.object().shape({
        reciept: Yup.string().required(t('errors.Receipt is a required field')?.toString()),
        
    })
    const addPageSchema = Yup.object().shape({
        content: Yup.string().required(t('errors.Content is a required field')?.toString()),
        arabic_content: Yup.string().required(t('errors.Arabic Content is a required field')?.toString()),
    })


    const addFaqSchema = Yup.object().shape({
        question: Yup.string().required(t('errors.Question is a required field')?.toString()),
        answer: Yup.string().required(t('errors.Answer is a required field')?.toString()),
        arabic_question: Yup.string().required(t('errors.Arabic Question is a required field')?.toString()),
        arabic_answer: Yup.string().required(t('errors.Arabic Answer is a required field')?.toString()),
    })


    
    const addTestimonialSchema = Yup.object().shape({
        name: Yup.string().required(t('errors.Name is a required field')?.toString()),
        review: Yup.string().required(t('errors.Review is a required field')?.toString()),
        arabic_name: Yup.string().required(t('errors.Arabic Name is a required field')?.toString()),
        arabic_review: Yup.string().required(t('errors.Arabic Review is a required field')?.toString()),
    })

    const customSchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        description: Yup.string().required(t('errors.Description is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        arabic_description: Yup.string().required(t("errors.Arabic Description is a required field")?.toString()),
    })


    const bannerSchema = Yup.object().shape({
        path: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })

    
    const testimonialSchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        path: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })

    const aboutStaticSchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        sub_heading: Yup.string().required(t('errors.Sub Heading is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        arabic_sub_heading: Yup.string().required(t('errors.Arabic Sub Heading is a required field')?.toString()),
        arabic_description: Yup.string().required(t("errors.Arabic Description is a required field")?.toString()),
        description: Yup.string().required(t('errors.Description is a required field')?.toString()),
        image1: Yup.string().required(t('errors.Image is a required field')?.toString()),
        image2: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })

    const storySchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        description: Yup.string().required(t('errors.Description is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        arabic_description: Yup.string().required(t("errors.Arabic Description is a required field")?.toString()),
        path: Yup.string().required(t('errors.Image is a required field')?.toString()),
    })

    const whychooseSchema = Yup.object().shape({
        heading: Yup.string().required(t('errors.Heading is a required field')?.toString()),
        arabic_heading: Yup.string().required(t('errors.Arabic Heading is a required field')?.toString()),
        sub_heading_1: Yup.string().required(t('errors.Sub Heading is a required field')?.toString()),
        arabic_sub_heading_1: Yup.string().required(t('errors.Arabic Sub Heading is a required field')?.toString()),
        sub_heading_2: Yup.string().required(t('errors.Sub Heading is a required field')?.toString()),
        arabic_sub_heading_2: Yup.string().required(t('errors.Arabic Sub Heading is a required field')?.toString()),
        sub_heading_3: Yup.string().required(t('errors.Sub Heading is a required field')?.toString()),
        arabic_sub_heading_3: Yup.string().required(t('errors.Arabic Sub Heading is a required field')?.toString()),
        sub_description_1: Yup.string().required(t('errors.Sub Description is a required field')?.toString()),
        arabic_sub_description_1: Yup.string().required(t('errors.Arabic Sub Description is a required field')?.toString()),
        sub_description_2: Yup.string().required(t('errors.Sub Description is a required field')?.toString()),
        arabic_sub_description_2: Yup.string().required(t('errors.Arabic Sub Description is a required field')?.toString()),
        sub_description_3: Yup.string().required(t('errors.Sub Description is a required field')?.toString()),
        arabic_sub_description_3: Yup.string().required(t('errors.Arabic Sub Description is a required field')?.toString()),
    })



    return {
        aboutSchema,
        reviewSchema,
        signupSchema,
        signInSchema,
        resetPasswordSchema,
        updatePasswordSchema,
        otpSchema,
        contactSchema,
        ChangePasswordSchema,
        editAddressSchema,
        addAddressSchema,
        ContactUsFormSchema,
        contactUsSchema,
        profileSchema,
        addReviewSchema,
        addCategorySchema,
        addServiceSchema,
        addSocialIconsSchema,
        addStaffSchema,
        addEmployeeSchema,
        addCouponSchema,
        // addRoleSchema,
        addNotificationSchema,
        addPaymentSchema,
        editEmployeeSchema,
        addPageSchema,
        addFaqSchema,
        addTestimonialSchema,
        customSchema,
        bannerSchema,
        testimonialSchema,
        aboutStaticSchema,
        storySchema,
        whychooseSchema
    }
}

export default useValidationSchemaHook

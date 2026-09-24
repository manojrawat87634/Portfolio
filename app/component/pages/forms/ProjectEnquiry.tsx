import React, { Dispatch, SetStateAction } from "react";
import { MdEmail, MdPerson, MdPhone, MdOutlineAttachMoney, MdWork, MdDateRange, MdDescription } from "react-icons/md";
import DynamicForm, { FormField } from "../../CommonForm/DynamicForm";

export interface ProjectEnquiryFormProps {
    setIsItemOpen?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
    getData?: (res?: any) => Promise<void> | void;
}

const ProjectEnquiryForm: React.FC<ProjectEnquiryFormProps> = ({ setIsItemOpen, getData }) => {
    const fields: FormField[] = [
        {
            name: "clientName",
            type: "text",
            label: "Full Name",
            placeholder: "John Doe",
            required: true,
            icon: MdPerson,
        },
        {
            name: "email",
            type: "text",
            label: "Email or phone number",
            placeholder: "john@example.com",
            required: true,
            icon: MdEmail,
        },
        {
            name: "projectType",
            type: "select",
            label: "Project Type",
            placeholder: "Select project type",
            required: true,
            icon: MdWork,
            options: [
                { label: "Web Application", value: "web_app" },
                { label: "Mobile Application", value: "mobile_app" },
                { label: "UI/UX Design", value: "ui_ux" },
                { label: "Custom Software Development", value: "custom_software" },
                { label: "Other", value: "other" },
            ],
        },
        {
            name: "budget",
            type: "select",
            label: "Estimated Budget",
            placeholder: "Select your budget range",
            required: true,
            icon: MdOutlineAttachMoney,
            options: [
                { label: "Less than $1,000", value: "lt_1k" },
                { label: "$1,000 - $5,000", value: "1k_5k" },
                { label: "$5,000 - $10,000", value: "5k_10k" },
                { label: "$10,000+", value: "gt_10k" },
            ],
        },
        {
            name: "projectDescription",
            type: "text",
            label: "Project Details / Requirements",
            placeholder: "Describe your project requirements...",
            required: true,
            icon: MdDescription,
        },
    ];

    return (
        <DynamicForm
            fields={fields}
            heading="Project Inquiry"
            buttonTitle="Submit Inquiry"
            postUrl="/admin/project-enquiries"
            theme="light"
            showToast={true}
            getData={getData}
            gradientColors="linear-gradient(to right, #1e3c72, #2a5298)"
            setIsItemOpen={setIsItemOpen}
        />
    );
};

export default ProjectEnquiryForm;
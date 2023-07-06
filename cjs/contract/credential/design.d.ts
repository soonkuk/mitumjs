export type templateData = {
    templateId: number;
    templateName: string;
    serviceDate: string;
    expirationDate: string;
    templateShare: boolean;
    multiAudit: boolean;
    displayName: string;
    subjectKey: string;
    description: string;
    creator: string;
};
export type issueData = {
    holder: string;
    templateId: number;
    id: string;
    value: string;
    validFrom: number;
    validUntil: number;
    did: string;
};

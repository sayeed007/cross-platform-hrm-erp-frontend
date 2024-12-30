export interface User {
    employeeVisibleId: string
    employeeId: number
    username: string
    firstName: string
    lastName: string
    email: string
    roles: string[]
    profilePicPath: string
    thumbnails_path_01: string
    thumbnails_path_02: string
    employmentStatus: string
    joiningDate: string
    currentLoginTime: string
    previousLoginTime: string
    companyId: number
    companyLogoPath: string
    companyName: string
    departmentId: number
    departmentName: string
    designationId: number
    designationName: string
    grade: number
    gradeLabel: string
    featureGroups: any[]
    isTeamLeader: boolean
    isHeadOfDepartment: boolean
    isLineManager: boolean
    isProjectManager: any
    accessToken: string
    tokenType: string
    employeeInfo: EmployeeInfo
    additionalAccessibility: AdditionalAccessibility
}

export interface EmployeeInfo {
    employeeVisibleId: string
    employeeId: number
    uniqueTag: any
    firstName: string
    lastName: string
    role: string
    email: string
    officialEmail: any
    active: boolean
    fatherName: string
    motherName: string
    username: string
    profilePicPath: string
    thumbnailsPath01: string
    thumbnailsPath02: string
    cvPath: string
    nidPassPath: string
    offerLetterPath: any
    appointmentLetter: string
    aggrementLetterPath: any
    clearanceLetterPath: any
    birthDate: string
    actualBirthDate: string
    gender: string
    nidNumber: string
    tinNumber: string
    nationality: string
    religion: string
    maritalStatus: string
    bloodGroup: string
    employmentStatus: string
    officialContact: string
    personalEmail: string
    joiningDate: string
    probationStartDate: string
    confirmationDate: string
    projectManagerId: any
    projectManagerName: any
    lineManagerId: number
    lineManagerVisibleId: string
    lineManagerName: string
    isLineManager: boolean
    teamLeaderId: number
    teamLeaderVisibleId: string
    teamLeaderName: string
    isTeamLeader: boolean
    headOfDepartmentId: number
    headOfDepartmentVisibleId: string
    headOfDepartmentName: string
    isHeadOfDepartment: boolean
    officialBenefit: OfficialBenefit
    attendanceRosterWeekends?: any
    attendanceRoaster: AttendanceRoaster
    leavePolicy: LeavePolicy
    bankDetails: BankDetails
    actualLeavePolicy: ActualLeavePolicy
    carryLeavePolicy: CarryLeavePolicy
    annualLeaveModel: AnnualLeaveModel
    salaryBenefit: SalaryBenefit
    econtact: Econtact
    leaveConsumed: LeaveConsumed
    presentAddress: PresentAddress
    permanentAddress: PermanentAddress
    roles: Role[]
    company: Company[]
    department: Department[]
    designation: Designation[]
    location: Location[]
    experience: Experience[]
    salaryInfo: SalaryInfo[]
    education: Education[]
    certification: any[]
    nominee: Nominee[]
    advanceSalary: any[]
    personalFiles?: personalFiles[]
    currentLoginTime: string
    previousLoginTime: string
    attendanceRoasterAssignmentDate: string
    attendanceRoasterEffectiveDateForConditionalWeekend: any
    employmentType: EmploymentType
    holidayPolicyId: number
    startingShiftId: any
    previousEmployeeId: any
    scheduledAttendanceRosterInfo: any
    employeeOrganization: EmployeeOrganization
    hasDisciplinaryIncidents: boolean
    thumbnails_path_02: string
    thumbnails_path_01: string
    isProjectManager: any
}

export interface personalFiles {
    id: number;
    fileName: string;
    fileDescription: string;
    filePath: string;
    version: number;
    updatedDate: string;
}

export interface OfficialBenefit {
    id: number
    isTransportUser: boolean
    transportRouteId: number
    transportPickupPointId: number
    transportDeductionAmount: number
    transportUsingStartDate: string
    transportUsingCancellationDate: any
    hasProvidentFund: boolean
    hasLFA: boolean
    lfaEligibilityDate: string
    hasGratuity: boolean
    hasDormitory: boolean
    hasBonus: boolean
    bonusPercentage: number
    isTaxApplicable: boolean
    hasLifeInsurance: boolean
    hasMedicalInsurance: boolean
    hasMobileAllowance: boolean
    mobileNumber: string
    mobileBalanceLimit: number
    mobileAllowanceEffectiveDate: string
    hasLunchAllowance: boolean
    lunchAllowanceAmount: number
    hasInvestment: boolean
    advanceIncomeTax: number
}

export interface AttendanceRoaster {
    id: number
    officeStartTime: string
    officeEndTime: string
    shiftName: string
    lateTime: string
    isConditionalWeekend: boolean
    interval: any
    conditionalWeekendDay: any
    effectiveDate: any
    weekendType: string
    numberOfWorkingDays: any
    numberOfWeekends: any
    weekends: string[]
    shiftTimeInformations: ShiftInfo[]
    shiftOrder: any[]
    roasterType: string
    rollingType: any
    rollingDuration: any
    halfDays: any[]
    hasHalfDay: boolean
    halfDayEndTime: any
    employeeEffectiveDateDTOs: any[]
}

export interface RoasterInfo extends AttendanceRoaster {
    employeeId: number;
    attendanceRoasterEffectiveDateForConditionalWeekend: any;
    joiningDate: string;
    attendanceRoasterAssignmentDate: string;
    startingShiftId: any;
    scheduledAttendanceRosterInfo: any;
}

export interface ShiftInfo {
    id: number; // Unique identifier for the shift
    shiftStartTime: string; // Start time of the shift in "HH:mm:ss" format
    shiftEndTime: string; // End time of the shift in "HH:mm:ss" format
    shiftName: string; // Name of the shift (e.g., "Shift C")
    shiftLateTime: string; // Late time for the shift in "HH:mm:ss" format
}
export interface LeavePolicy {
    id: number
    policyName: string
    validFrom: string
    expiresOn: any
    configurableLeaveV2s: ConfigurableLeaveV2[]
    employeeEffectiveDateDTOs: any[]
    configurableLeaves: ConfigurableLefe[]
}

export interface ConfigurableLeaveV2 {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    leaveType: string
    leaveColor: string
    fieldType: string
    leaveConfigurationLevels: LeaveConfigurationLevel[]
    active: boolean
    showAttachmentConfiguration: boolean
    showHalfDayConfiguration: boolean
    showRequiredPresentDayConfiguration: boolean
    showAdminApprovalRequiredConfiguration: boolean
    isBasicConfigRequired: boolean
    isAccrualConfigRequired: boolean
    isResetConfigRequired: boolean
    disableAccrualConfig: boolean
    disableResetConfig: boolean
    showFixedLeaveCount: boolean
    hasMultipleConfigurableLevel: boolean
}

export interface LeaveConfigurationLevel {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    basicConfig: BasicConfig
    accrualConfig: AccrualConfig
    resetConfig: ResetConfig
}

export interface BasicConfig {
    effectiveAfter: number
    effectiveAfterUnit: string
    effectiveAfterFrom: string
    leaveAllocationType: string
    leaveDeduction: string
    requiredPresentDays: number
    attachmentRequired: boolean
    minLeaveDaysAttachmentToBeRequired: number
    halfDayAllowed: boolean
    adminApprovalRequired: boolean
    fixedLeaveCount?: number | null
    active: boolean
}

export interface AccrualConfig {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    leaveBalance?: number | null
    prorateAt?: string | null
    timelineConfig?: TimelineConfig | null
    advancedAccrualConfig: AdvancedAccrualConfig
    active: boolean
    hibernateLazyInitializer: HibernateLazyInitializer2
}

export interface TimelineConfig {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    timelineType: string
    distributionConfigs: DistributionConfig[]
    hibernateLazyInitializer: HibernateLazyInitializer
}

export interface DistributionConfig {
    primaryValue: string
    secondaryValue: string
    secondaryValueType: string
    leaveBalance: any
}

export interface HibernateLazyInitializer { }

export interface AdvancedAccrualConfig {
    prorateBy?: string | null
    roundOffTo?: string | null
    roundOffType?: string | null
    edgePeriodRules: any[]
}

export interface HibernateLazyInitializer2 { }

export interface ResetConfig {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    timelineConfig?: TimelineConfig2 | null
    carryForwardConfig?: CarryForwardConfig | null
    encashmentConfig?: EncashmentConfig | null
    active: boolean
    hibernateLazyInitializer: HibernateLazyInitializer4
}

export interface TimelineConfig2 {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    timelineType: string
    distributionConfigs: DistributionConfig2[]
    hibernateLazyInitializer: HibernateLazyInitializer3
}

export interface DistributionConfig2 {
    primaryValue: string
    secondaryValue: string
    secondaryValueType: string
    leaveBalance: any
}

export interface HibernateLazyInitializer3 { }

export interface CarryForwardConfig {
    type: string
    count: number
    countType: string
    maxLimit: number
    overallLimit: number
    expiresIn: any
    expiresInTimeUnit: any
}

export interface EncashmentConfig {
    count: number
    countType: string
    maxLimit: number
}

export interface HibernateLazyInitializer4 { }

export interface ConfigurableLefe {
    id: any
    leaveType: string
    leaveAllocationType: string
    leaveDeduction: string
    fieldType: string
    requiredPresentDays: number
    numberOfLeave: number
    attachmentRequired: boolean
    minLeaveDaysAttachmentToBeRequired: number
    leaveColor: string
    halfDayAllowed: boolean
    adminApprovalRequired: boolean
}

export interface BankDetails {
    id: number
    bankName: string
    branchName: string
    accountNo: string
}

export interface ActualLeavePolicy {
    id: number
    policyName: string
    sick: number
    special: number
    casual: number
    annual: number
    maternity: number
    paternity: number
    marriage: number
    compassionate: number
    other: number
    lfa: number
    leaveCounts: any[]
}

export interface CarryLeavePolicy {
    id: number
    createdBy: string
    creationDate: string
    lastModifiedBy: string
    lastModifiedDate: string
    leaveCounts: any[]
}

export interface AnnualLeaveModel {
    id: number
    totalLeave: number
    actualCarriedLeave: number
    previousTotalLeave: number
    elCarriedForNextYear: number
    elCarriedFromPrevYear: number
    assignerId: any
    assignerName: any
    assignedLeave: number
    assignedCarriedLeave: number
    previousUnusedSickLeave: number
    previousUnusedCasualLeave: number
    previousUnusedMaternityLeave: number
    previousUnusedPaternityLeave: number
    previousUnusedMarriageLeave: number
    previousUnusedCompassionateLeave: number
    previousUnusedOtherLeave: number
    previousUnusedSpecialLeave: number
    previousUnusedLfaLeave: number
    peviousUnusedLeaveCounts: any[]
    annualLeaveCalculationStartDate: string
    isCutOff: boolean
}

export interface SalaryBenefit {
    id: number
    joiningSalary: number
    presentSalary: number
    bankAmount: number
    cashAmount: number
    lastIncrementAmount: number
    lastIncrementPercentage: number
    adjustmentType: string
    effectiveDate: string
}

export interface Econtact {
    villageName: string
    buildingNo: string
    street: string
    state: string
    postalCode: string
    city: string
    country: string
    id: number
    name: string
    address: string
    relation: string
    email: string
    mobile: string
}

export interface LeaveConsumed {
    leaveConsumedId: number
    sick: number
    special: number
    casual: number
    annual: number
    maternity: number
    paternity: number
    marriage: number
    compassionate: number
    other: number
    lfa: number
    leaveCounts: LeaveCount[]
}

export interface LeaveCount {
    configurableLeaveId: number
    leaveType: string
    leaveTypeCount: number
}

export interface PresentAddress {
    villageName: string
    buildingNo: string
    street: any
    state: string
    postalCode: string
    city: string
    country: string
    id: number
}

export interface PermanentAddress {
    villageName: string
    buildingNo: string
    street: any
    state: string
    postalCode: string
    city: string
    country: string
    id: number
}

export interface Role {
    id: number
    name: string
}

export interface Company {
    id: number
    name: string
    legalEntityName: string
    establishDate: string
    description: string
    transportRoute: TransportRoute[]
    companyBankInfo: CompanyBankInfo
    gradeDetails: any[]
    organizationHierarchy: any
    employmentStatuses: any[]
    employmentTypes: any[]
}

export interface TransportRoute {
    id: number
    routeName: string
    routeDescription: string
    pickupPoints: PickupPoint[]
}

export interface PickupPoint {
    id: number
    pickupPointName: string
}

export interface CompanyBankInfo {
    id: number
    bankName: string
    branchName: string
    accountNo: string
    chequeSignatory: ChequeSignatory[]
}

export interface ChequeSignatory {
    id: number
    chequeSingnatoryName: string
    chequeSingnatoryDesignation: string
}

export interface Department {
    id: number
    departmentName: string
    description: string
}

export interface Designation {
    id: number
    designationName: string
    description: string
    grade: number
    gradeLabel: string
    gradeDescription: string
    probationPeriodInDays: number
    noticePeriodInDaysForContractual: number
    noticePeriodInDaysForProbation: number
    noticePeriodInDaysForPermanent: number
}

export interface Location {
    id: number
    alias: string
    address: string
    street: string
    postalCode: string
    state: string
    city: string
    country: string
    isMainLocation: boolean
}

export interface Experience {
    id: number
    company: string
    industry: string
    designation: string
    department: string
    duration: string
    startDate: string
    endDate: string
    experienceCertificateUrl: any
    employmentType: string
}

export interface SalaryInfo {
    id: number
    effectiveDate: string
    amount: number
    bankAmount: number
    cashAmount: number
    incrementAmount: number
    percentage: number
    status: string
    certificateUrl: any
    companyId: number
    companyName: string
    locationId?: number | null
    locationAlias?: string | null
    departmentId: number
    departmentName: string
    designationId: number
    designationName: string
    employmentTypeId: any
    employmentType: any
    employmentStatus: any
    organizationElements: OrganizationElement[]
    attendanceRoasterId: any
    leavePolicyId: any
}

export interface OrganizationElement {
    id: number
    organizationElementType: OrganizationElementType
    name: string
    description: string
    parentOrganizationId?: number | null
    organizationDetailsEntity: string
    organizationDetailsEntityId: number
    organizationDetails: any
}

export interface OrganizationElementType {
    id: number
    label: string
}

export interface Education {
    id: number
    degree: string
    institute: string
    passingYear: string
    major: string
    grade: number
    result: string
    educationCertificateUrl: any
    levelOfEducation: string
    board: any
    foreignInstitute: any
    marks: any
    cgpa: any
    scale: any
    expectedYearOfPassing: any
    duration: any
    achievements: any
}

export interface Nominee {
    villageName: string
    buildingNo: string
    street: string
    state: string
    postalCode: string
    city: string
    country: string
    id: number
    name: string
    address: string
    relation: string
    birthDate: string
    mobile: string
    percentage: number
    isDeleted: boolean
}

export interface EmploymentType {
    id: number
    employmentType: string
}

export interface EmployeeOrganization {
    id: number
    employeeVisibleId: string
    employeeId: number
    organizationElements: OrganizationElement2[]
    organizationHierarchy: OrganizationHierarchy
}

export interface OrganizationElement2 {
    id: number
    organizationElementType: OrganizationElementType2
    name: string
    description: string
    parentOrganizationId?: number | null
    organizationDetailsEntity: string
    organizationDetailsEntityId: number
    organizationDetails: any
}

export interface OrganizationElementType2 {
    id: number
    label: string
}

export interface OrganizationHierarchy {
    id: number
    companyId: number
    hierarchy: Hierarchy[]
}

export interface Hierarchy {
    id: number
    organizationElementType: OrganizationElementType3
    positionInHierarchy: number
}

export interface OrganizationElementType3 {
    id: number
    label: string
}

export interface AdditionalAccessibility {
    hasOnboardingFlowAccess: boolean
    careerAccess: any
    hasFoodProgramSubscription: boolean
    canClockAttendance: boolean
    hasOtApproval: boolean
    additionalRoles: any[]
}


export const defaultUser: User = {
    "employeeVisibleId": "",
    "employeeId": 0,
    "username": "",
    "firstName": "",
    "lastName": "",
    "email": "",
    "roles": [""],
    "profilePicPath": "img/1676443680500_200005.jpg",
    "thumbnails_path_01": "img/200005thumb01.jpg",
    "thumbnails_path_02": "img/200005thumb02.jpg",
    "employmentStatus": "permanent",
    "joiningDate": "2019-12-01 00:00:00",
    "currentLoginTime": "2024-12-27 15:26:54",
    "previousLoginTime": "2024-12-27 11:42:32",
    "companyId": 1,
    "companyLogoPath": "img/1676431257490_1.png",
    "companyName": "Neural Semiconductor Limited",
    "departmentId": 4,
    "departmentName": "PnR",
    "designationId": 17,
    "designationName": "Physical Design Manager",
    "grade": 3,
    "gradeLabel": "C",
    "featureGroups": [],
    "isTeamLeader": true,
    "isHeadOfDepartment": false,
    "isLineManager": true,
    "isProjectManager": null,
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MjAwMDA1LCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiaGFzRHluYW1pY1JvbGUiOmZhbHNlLCJzdWIiOiJyYWloYW5hLnphbm5hdEBuc2wuY29tIiwiaWF0IjoxNzM1MjkxNjE0LCJleHAiOjE3MzUzNzgwMTR9.WJANOF0OinQNGlnKxwtygIJorWmwLWfnvZdn4qXgpP3wr8ZB8-zOdVXEtCGIl25FPxCOslCBOKh5Qgh-9eLLww",
    "tokenType": "Bearer",
    "employeeInfo": {
        "employeeVisibleId": "200005",
        "employeeId": 200005,
        "uniqueTag": null,
        "firstName": "Raihana",
        "lastName": "Zannat",
        "role": "Admin",
        "email": "raihana.zannat@nsl.com",
        "officialEmail": null,
        "active": true,
        "fatherName": "Tokir Haider",
        "motherName": "Najma Khatun",
        "username": "raihana.zannat@nsl.com",
        "profilePicPath": "img/1676443680500_200005.jpg",
        "thumbnailsPath01": "img/200005thumb01.jpg",
        "thumbnailsPath02": "img/200005thumb02.jpg",
        "cvPath": "cv/1677480425671_200005.png",
        "nidPassPath": "nid_pass/1677480420420_200005.png",
        "offerLetterPath": null,
        "appointmentLetter": "appointment/1677480430307_200005.png",
        "aggrementLetterPath": null,
        "clearanceLetterPath": null,
        "birthDate": "1989-04-07",
        "actualBirthDate": "2023-04-07",
        "gender": "female",
        "nidNumber": "4456667889",
        "tinNumber": "231489987412",
        "nationality": "Bangladeshi",
        "religion": "Islam",
        "maritalStatus": "married",
        "bloodGroup": "B+",
        "employmentStatus": "permanent",
        "officialContact": "8801734567811",
        "personalEmail": "raihana@mail.com",
        "joiningDate": "2019-12-01",
        "probationStartDate": "2019-12-01",
        "confirmationDate": "2019-12-01",
        "projectManagerId": null,
        "projectManagerName": null,
        "lineManagerId": 200001,
        "lineManagerVisibleId": "200001",
        "lineManagerName": "Rashed Haider",
        "isLineManager": true,
        "teamLeaderId": 200048,
        "teamLeaderVisibleId": "200048",
        "teamLeaderName": "Zayed Khan",
        "isTeamLeader": true,
        "headOfDepartmentId": 500001,
        "headOfDepartmentVisibleId": "500001",
        "headOfDepartmentName": "Abdul Hannan",
        "isHeadOfDepartment": false,
        "officialBenefit": {
            "id": 33,
            "isTransportUser": true,
            "transportRouteId": 17,
            "transportPickupPointId": 27,
            "transportDeductionAmount": 1000,
            "transportUsingStartDate": "2019-12-01",
            "transportUsingCancellationDate": null,
            "hasProvidentFund": true,
            "hasLFA": true,
            "lfaEligibilityDate": "2023-01-01",
            "hasGratuity": true,
            "hasDormitory": true,
            "hasBonus": true,
            "bonusPercentage": 50,
            "isTaxApplicable": true,
            "hasLifeInsurance": true,
            "hasMedicalInsurance": true,
            "hasMobileAllowance": true,
            "mobileNumber": "+8801772232001",
            "mobileBalanceLimit": 2000,
            "mobileAllowanceEffectiveDate": "2024-01-20",
            "hasLunchAllowance": true,
            "lunchAllowanceAmount": 1000,
            "hasInvestment": true,
            "advanceIncomeTax": 0
        },
        "attendanceRoaster": {
            "id": 1,
            "officeStartTime": "08:30:00",
            "officeEndTime": "17:30:00",
            "shiftName": "General-1",
            "lateTime": "09:00:00",
            "isConditionalWeekend": false,
            "interval": null,
            "conditionalWeekendDay": null,
            "effectiveDate": null,
            "weekendType": "FIXED",
            "numberOfWorkingDays": null,
            "numberOfWeekends": null,
            "weekends": [
                "Saturday",
                "Sunday"
            ],
            "shiftTimeInformations": [],
            "shiftOrder": [],
            "roasterType": "REGULAR",
            "rollingType": null,
            "rollingDuration": null,
            "halfDays": [],
            "hasHalfDay": false,
            "halfDayEndTime": null,
            "employeeEffectiveDateDTOs": []
        },
        "leavePolicy": {
            "id": 1,
            "policyName": "Leave Policy-1",
            "validFrom": "1970-01-01",
            "expiresOn": null,
            "configurableLeaveV2s": [
                {
                    "id": 6,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "casual",
                    "leaveColor": "#F2994A",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 6,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "WORKING_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": true,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 6,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 10,
                                "prorateAt": "START_OF_POLICY",
                                "timelineConfig": {
                                    "id": 7,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 6,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 8,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 5,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "sick",
                    "leaveColor": "#BA6BD9",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 5,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "WORKING_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": true,
                                "minLeaveDaysAttachmentToBeRequired": 3,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 5,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 10,
                                "prorateAt": "START_OF_POLICY",
                                "timelineConfig": {
                                    "id": 5,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 5,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 6,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": true,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 2,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "maternity",
                    "leaveColor": "#BF286C",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 2,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 2,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 120,
                                "prorateAt": "DO_NOT_PRORATE",
                                "timelineConfig": {
                                    "id": 1,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 2,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 2,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 3,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "paternity",
                    "leaveColor": "#557A46",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 3,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 3,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 3,
                                "prorateAt": "DO_NOT_PRORATE",
                                "timelineConfig": {
                                    "id": 3,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 3,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 4,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 7,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "annual",
                    "leaveColor": "#E3B7A0",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 7,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "CALCULATED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 18,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 75,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": null,
                                "prorateAt": null,
                                "timelineConfig": null,
                                "advancedAccrualConfig": {
                                    "prorateBy": null,
                                    "roundOffTo": null,
                                    "roundOffType": null,
                                    "edgePeriodRules": []
                                },
                                "active": false,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 75,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": null,
                                "carryForwardConfig": null,
                                "encashmentConfig": null,
                                "active": false,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": true,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": false,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": true,
                    "disableResetConfig": true,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": false
                },
                {
                    "id": 1,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "lfa",
                    "leaveColor": "#03045E",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 1,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": 15,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 76,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": null,
                                "prorateAt": null,
                                "timelineConfig": null,
                                "advancedAccrualConfig": {
                                    "prorateBy": null,
                                    "roundOffTo": null,
                                    "roundOffType": null,
                                    "edgePeriodRules": []
                                },
                                "active": false,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 76,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": null,
                                "carryForwardConfig": null,
                                "encashmentConfig": null,
                                "active": false,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": false,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": true,
                    "disableResetConfig": true,
                    "showFixedLeaveCount": true,
                    "hasMultipleConfigurableLevel": false
                },
                {
                    "id": 10,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "marriage",
                    "leaveColor": "#FE1E89",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 10,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 10,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 10,
                                "prorateAt": "DO_NOT_PRORATE",
                                "timelineConfig": {
                                    "id": 9,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 10,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 10,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 11,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "compassionate",
                    "leaveColor": "#5C4B99",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 11,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 11,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": 4,
                                "prorateAt": "DO_NOT_PRORATE",
                                "timelineConfig": {
                                    "id": 11,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "advancedAccrualConfig": {
                                    "prorateBy": "DAY",
                                    "roundOffTo": "MINIMUM",
                                    "roundOffType": "FULL_DAY",
                                    "edgePeriodRules": []
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 11,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": {
                                    "id": 12,
                                    "createdBy": "1",
                                    "creationDate": "2024-11-14 09:16:53",
                                    "lastModifiedBy": "1",
                                    "lastModifiedDate": "2024-12-18 12:00:27",
                                    "timelineType": "YEARLY",
                                    "distributionConfigs": [
                                        {
                                            "primaryValue": "1",
                                            "secondaryValue": "January",
                                            "secondaryValueType": "MONTH",
                                            "leaveBalance": null
                                        }
                                    ],
                                    "hibernateLazyInitializer": {}
                                },
                                "carryForwardConfig": {
                                    "type": "CARRY_FORWARD",
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0,
                                    "overallLimit": 0,
                                    "expiresIn": null,
                                    "expiresInTimeUnit": null
                                },
                                "encashmentConfig": {
                                    "count": 0,
                                    "countType": "UNIT",
                                    "maxLimit": 0
                                },
                                "active": true,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                },
                {
                    "id": 4,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "special",
                    "leaveColor": "#086E7D",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 4,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "NOT_LIMITED",
                                "leaveDeduction": "WORKING_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 77,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": null,
                                "prorateAt": null,
                                "timelineConfig": null,
                                "advancedAccrualConfig": {
                                    "prorateBy": null,
                                    "roundOffTo": null,
                                    "roundOffType": null,
                                    "edgePeriodRules": []
                                },
                                "active": false,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 77,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": null,
                                "carryForwardConfig": null,
                                "encashmentConfig": null,
                                "active": false,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": false,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": true,
                    "disableResetConfig": true,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": false
                },
                {
                    "id": 8,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "unpaid",
                    "leaveColor": "#1300F1",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 8,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "NOT_LIMITED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": false,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 78,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": null,
                                "prorateAt": null,
                                "timelineConfig": null,
                                "advancedAccrualConfig": {
                                    "prorateBy": null,
                                    "roundOffTo": null,
                                    "roundOffType": null,
                                    "edgePeriodRules": []
                                },
                                "active": false,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 78,
                                "createdBy": "1",
                                "creationDate": "2024-12-18 12:00:27",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": null,
                                "carryForwardConfig": null,
                                "encashmentConfig": null,
                                "active": false,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": false,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": false,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": true,
                    "disableResetConfig": true,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": false
                },
                {
                    "id": 9,
                    "createdBy": "1",
                    "creationDate": "2024-11-14 09:16:53",
                    "lastModifiedBy": "1",
                    "lastModifiedDate": "2024-12-18 12:00:27",
                    "leaveType": "compensation",
                    "leaveColor": "#eb4034",
                    "fieldType": "DEFINED",
                    "leaveConfigurationLevels": [
                        {
                            "id": 9,
                            "createdBy": "1",
                            "creationDate": "2024-11-14 09:16:53",
                            "lastModifiedBy": "1",
                            "lastModifiedDate": "2024-12-18 12:00:27",
                            "basicConfig": {
                                "effectiveAfter": 0,
                                "effectiveAfterUnit": "MONTH",
                                "effectiveAfterFrom": "JOINING_DATE",
                                "leaveAllocationType": "FIXED",
                                "leaveDeduction": "CALENDAR_DAYS",
                                "requiredPresentDays": 0,
                                "attachmentRequired": false,
                                "minLeaveDaysAttachmentToBeRequired": 0,
                                "halfDayAllowed": false,
                                "adminApprovalRequired": true,
                                "fixedLeaveCount": null,
                                "active": true
                            },
                            "accrualConfig": {
                                "id": 9,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "leaveBalance": null,
                                "prorateAt": null,
                                "timelineConfig": null,
                                "advancedAccrualConfig": {
                                    "prorateBy": null,
                                    "roundOffTo": null,
                                    "roundOffType": null,
                                    "edgePeriodRules": []
                                },
                                "active": false,
                                "hibernateLazyInitializer": {}
                            },
                            "resetConfig": {
                                "id": 9,
                                "createdBy": "1",
                                "creationDate": "2024-11-14 09:16:53",
                                "lastModifiedBy": "1",
                                "lastModifiedDate": "2024-12-18 12:00:27",
                                "timelineConfig": null,
                                "carryForwardConfig": null,
                                "encashmentConfig": null,
                                "active": false,
                                "hibernateLazyInitializer": {}
                            }
                        }
                    ],
                    "active": true,
                    "showAttachmentConfiguration": false,
                    "showHalfDayConfiguration": true,
                    "showRequiredPresentDayConfiguration": false,
                    "showAdminApprovalRequiredConfiguration": true,
                    "isBasicConfigRequired": true,
                    "isAccrualConfigRequired": true,
                    "isResetConfigRequired": false,
                    "disableAccrualConfig": false,
                    "disableResetConfig": false,
                    "showFixedLeaveCount": false,
                    "hasMultipleConfigurableLevel": true
                }
            ],
            "employeeEffectiveDateDTOs": [],
            "configurableLeaves": [
                {
                    "id": null,
                    "leaveType": "casual",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "WORKING_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 10,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#F2994A",
                    "halfDayAllowed": true,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "sick",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "WORKING_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 10,
                    "attachmentRequired": true,
                    "minLeaveDaysAttachmentToBeRequired": 3,
                    "leaveColor": "#BA6BD9",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "maternity",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 120,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#BF286C",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "paternity",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 3,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#557A46",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "annual",
                    "leaveAllocationType": "CALCULATED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 18,
                    "numberOfLeave": 0,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#E3B7A0",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "lfa",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 15,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#03045E",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "marriage",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 10,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#FE1E89",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "compassionate",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 4,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#5C4B99",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "special",
                    "leaveAllocationType": "NOT_LIMITED",
                    "leaveDeduction": "WORKING_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 0,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#086E7D",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "unpaid",
                    "leaveAllocationType": "NOT_LIMITED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 0,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#1300F1",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": false
                },
                {
                    "id": null,
                    "leaveType": "compensation",
                    "leaveAllocationType": "FIXED",
                    "leaveDeduction": "CALENDAR_DAYS",
                    "fieldType": "DEFINED",
                    "requiredPresentDays": 0,
                    "numberOfLeave": 0,
                    "attachmentRequired": false,
                    "minLeaveDaysAttachmentToBeRequired": 0,
                    "leaveColor": "#eb4034",
                    "halfDayAllowed": false,
                    "adminApprovalRequired": true
                }
            ]
        },
        "bankDetails": {
            "id": 33,
            "bankName": "City Bank",
            "branchName": "Badda",
            "accountNo": "2403271254006"
        },
        "actualLeavePolicy": {
            "id": 5,
            "policyName": "Leave Policy-1",
            "sick": 10,
            "special": 0,
            "casual": 10,
            "annual": 0,
            "maternity": 120,
            "paternity": 3,
            "marriage": 10,
            "compassionate": 4,
            "other": 0,
            "lfa": 15,
            "leaveCounts": []
        },
        "carryLeavePolicy": {
            "id": 92,
            "createdBy": "1",
            "creationDate": "2024-11-14 09:16:53",
            "lastModifiedBy": "1",
            "lastModifiedDate": "2024-11-14 09:16:56",
            "leaveCounts": []
        },
        "annualLeaveModel": {
            "id": 19,
            "totalLeave": 38.05555555555556,
            "actualCarriedLeave": 25.5,
            "previousTotalLeave": 25.5,
            "elCarriedForNextYear": 0,
            "elCarriedFromPrevYear": 0,
            "assignerId": null,
            "assignerName": null,
            "assignedLeave": 0,
            "assignedCarriedLeave": 0,
            "previousUnusedSickLeave": 10,
            "previousUnusedCasualLeave": 10,
            "previousUnusedMaternityLeave": 120,
            "previousUnusedPaternityLeave": 3,
            "previousUnusedMarriageLeave": 3,
            "previousUnusedCompassionateLeave": 4,
            "previousUnusedOtherLeave": 0,
            "previousUnusedSpecialLeave": 0,
            "previousUnusedLfaLeave": 15,
            "peviousUnusedLeaveCounts": [],
            "annualLeaveCalculationStartDate": "01-01-2024 00:00:00",
            "isCutOff": false
        },
        "salaryBenefit": {
            "id": 33,
            "joiningSalary": 120000,
            "presentSalary": 120000,
            "bankAmount": 119999,
            "cashAmount": 1,
            "lastIncrementAmount": 0,
            "lastIncrementPercentage": 0,
            "adjustmentType": "joining",
            "effectiveDate": "2019-12-01"
        },
        "econtact": {
            "villageName": "Badda",
            "buildingNo": "13",
            "street": "",
            "state": "Dhaka Division",
            "postalCode": "1230",
            "city": "Dhaka",
            "country": "Bangladesh",
            "id": 33,
            "name": "Tokir Ahmed",
            "address": "",
            "relation": "father",
            "email": "",
            "mobile": "880178985063"
        },
        "leaveConsumed": {
            "leaveConsumedId": 33,
            "sick": 0,
            "special": 0,
            "casual": 0,
            "annual": 0,
            "maternity": 0,
            "paternity": 0,
            "marriage": 0,
            "compassionate": 0,
            "other": 0,
            "lfa": 0,
            "leaveCounts": [
                {
                    "configurableLeaveId": 9,
                    "leaveType": "unpaid",
                    "leaveTypeCount": 0
                }
            ]
        },
        "presentAddress": {
            "villageName": "Badda",
            "buildingNo": "13",
            "street": null,
            "state": "Dhaka Division",
            "postalCode": "1230",
            "city": "Dhaka",
            "country": "Bangladesh",
            "id": 33
        },
        "permanentAddress": {
            "villageName": "Badda",
            "buildingNo": "13",
            "street": null,
            "state": "Dhaka Division",
            "postalCode": "1230",
            "city": "Dhaka",
            "country": "Bangladesh",
            "id": 33
        },
        "roles": [
            {
                "id": 3,
                "name": "ROLE_ADMIN"
            }
        ],
        "company": [
            {
                "id": 1,
                "name": "Neural Semiconductor Limited",
                "legalEntityName": "Neural Semiconductor",
                "establishDate": "2017-04-01",
                "description": "We provide software testing and quality assurance services for your software, REST API and system. We do quality assurance by both manual and automated testing. We test if client's REST API conforms to API documentation.",
                "transportRoute": [
                    {
                        "id": 1,
                        "routeName": "Gazipur-Gulshan",
                        "routeDescription": "",
                        "pickupPoints": [
                            {
                                "id": 18,
                                "pickupPointName": "Bashundhara"
                            },
                            {
                                "id": 1,
                                "pickupPointName": "Gazipur"
                            },
                            {
                                "id": 19,
                                "pickupPointName": "Uttara"
                            },
                            {
                                "id": 20,
                                "pickupPointName": "Nikunja"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "routeName": "Azimpur-Gulshan",
                        "routeDescription": "",
                        "pickupPoints": [
                            {
                                "id": 23,
                                "pickupPointName": "Mohakhali"
                            },
                            {
                                "id": 22,
                                "pickupPointName": "Dhanmondi"
                            },
                            {
                                "id": 2,
                                "pickupPointName": "Azimpur"
                            },
                            {
                                "id": 21,
                                "pickupPointName": "Bijoy Sharani-Mohakhali"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "routeName": "Mohammadpur-Gulshan",
                        "routeDescription": "",
                        "pickupPoints": [
                            {
                                "id": 3,
                                "pickupPointName": "Mohammadpur-Mirpur"
                            },
                            {
                                "id": 24,
                                "pickupPointName": "Banani"
                            },
                            {
                                "id": 25,
                                "pickupPointName": "ECB Chottor"
                            },
                            {
                                "id": 26,
                                "pickupPointName": "Mirpur"
                            }
                        ]
                    },
                    {
                        "id": 17,
                        "routeName": "Sayedabad-Gulshan",
                        "routeDescription": "",
                        "pickupPoints": [
                            {
                                "id": 17,
                                "pickupPointName": "Golapbagh"
                            },
                            {
                                "id": 28,
                                "pickupPointName": "Abul Hotel"
                            },
                            {
                                "id": 27,
                                "pickupPointName": "Badda"
                            },
                            {
                                "id": 29,
                                "pickupPointName": "Notun Bazar"
                            }
                        ]
                    },
                    {
                        "id": 22,
                        "routeName": "Uttara-Mirpur-Uttara",
                        "routeDescription": "",
                        "pickupPoints": [
                            {
                                "id": 76,
                                "pickupPointName": "Mirpur 1"
                            }
                        ]
                    }
                ],
                "companyBankInfo": {
                    "id": 1,
                    "bankName": "City Bank Ltd",
                    "branchName": "Uttara",
                    "accountNo": "2403214254006",
                    "chequeSignatory": [
                        {
                            "id": 60,
                            "chequeSingnatoryName": "Zainul abedin",
                            "chequeSingnatoryDesignation": "COO"
                        }
                    ]
                },
                "gradeDetails": [],
                "organizationHierarchy": null,
                "employmentStatuses": [],
                "employmentTypes": []
            }
        ],
        "department": [
            {
                "id": 4,
                "departmentName": "PnR",
                "description": "PnR"
            }
        ],
        "designation": [
            {
                "id": 17,
                "designationName": "Physical Design Manager",
                "description": "",
                "grade": 3,
                "gradeLabel": "C",
                "gradeDescription": "",
                "probationPeriodInDays": 90,
                "noticePeriodInDaysForContractual": 30,
                "noticePeriodInDaysForProbation": 45,
                "noticePeriodInDaysForPermanent": 90
            }
        ],
        "location": [
            {
                "id": 1,
                "alias": "Head Office",
                "address": "Gulshan",
                "street": " Road#10,Gulshan 5",
                "postalCode": "1212",
                "state": "Dhaka Division",
                "city": "Dhaka",
                "country": "Bangladesh",
                "isMainLocation": true
            }
        ],
        "experience": [
            {
                "id": 55,
                "company": "Winbridge Tech bd",
                "industry": "",
                "designation": "Sr. Design Engineer",
                "department": "",
                "duration": "",
                "startDate": "2015-2-1",
                "endDate": "2019-2-31",
                "experienceCertificateUrl": null,
                "employmentType": "full-time"
            }
        ],
        "salaryInfo": [
            {
                "id": 219,
                "effectiveDate": "2019-04-01",
                "amount": 120000,
                "bankAmount": 119999,
                "cashAmount": 1,
                "incrementAmount": 0,
                "percentage": 0,
                "status": "promotion",
                "certificateUrl": null,
                "companyId": 1,
                "companyName": "Neural Semiconductor Limited",
                "locationId": null,
                "locationAlias": null,
                "departmentId": 4,
                "departmentName": "PnR",
                "designationId": 17,
                "designationName": "Physical Design Manager",
                "employmentTypeId": null,
                "employmentType": null,
                "employmentStatus": null,
                "organizationElements": [],
                "attendanceRoasterId": null,
                "leavePolicyId": null
            },
            {
                "id": 53,
                "effectiveDate": "2019-12-01",
                "amount": 120000,
                "bankAmount": 119999,
                "cashAmount": 1,
                "incrementAmount": 0,
                "percentage": 0,
                "status": "joining",
                "certificateUrl": null,
                "companyId": 1,
                "companyName": "Neural Semiconductor Limited",
                "locationId": 1,
                "locationAlias": "Head Office",
                "departmentId": 4,
                "departmentName": "PnR",
                "designationId": 16,
                "designationName": "Senior Physical Design Engineer",
                "employmentTypeId": null,
                "employmentType": null,
                "employmentStatus": null,
                "organizationElements": [
                    {
                        "id": 94,
                        "organizationElementType": {
                            "id": 3,
                            "label": "location"
                        },
                        "name": "Head Office",
                        "description": "Gulshan,  Road#10,Gulshan 5, Dhaka Division, 1212, Dhaka, Bangladesh",
                        "parentOrganizationId": 93,
                        "organizationDetailsEntity": "location",
                        "organizationDetailsEntityId": 1,
                        "organizationDetails": null
                    },
                    {
                        "id": 137,
                        "organizationElementType": {
                            "id": 2,
                            "label": "department"
                        },
                        "name": "PnR",
                        "description": "PnR",
                        "parentOrganizationId": 93,
                        "organizationDetailsEntity": "department",
                        "organizationDetailsEntityId": 4,
                        "organizationDetails": null
                    },
                    {
                        "id": 138,
                        "organizationElementType": {
                            "id": 7,
                            "label": "designation"
                        },
                        "name": "Physical Design Manager",
                        "description": "",
                        "parentOrganizationId": 137,
                        "organizationDetailsEntity": "designation",
                        "organizationDetailsEntityId": 17,
                        "organizationDetails": null
                    },
                    {
                        "id": 93,
                        "organizationElementType": {
                            "id": 1,
                            "label": "company"
                        },
                        "name": "Neural Semiconductor Limited",
                        "description": "We provide software testing and quality assurance services for your software, REST API and system. We do quality assurance by both manual and automated testing. We test if client's REST API conforms to API documentation.",
                        "parentOrganizationId": null,
                        "organizationDetailsEntity": "company",
                        "organizationDetailsEntityId": 1,
                        "organizationDetails": null
                    }
                ],
                "attendanceRoasterId": null,
                "leavePolicyId": null
            }
        ],
        "education": [
            {
                "id": 56,
                "degree": "Bachelor of Science (BSc)",
                "institute": "Rajshahi University of Engineering & Technology",
                "passingYear": "2015",
                "major": "EEE",
                "grade": 3,
                "result": "First Division/Class",
                "educationCertificateUrl": null,
                "levelOfEducation": "Bachelors",
                "board": null,
                "foreignInstitute": null,
                "marks": null,
                "cgpa": null,
                "scale": null,
                "expectedYearOfPassing": null,
                "duration": null,
                "achievements": null
            }
        ],
        "certification": [],
        "nominee": [
            {
                "villageName": "Badda",
                "buildingNo": "13",
                "street": "13",
                "state": "Dhaka Division",
                "postalCode": "1200",
                "city": "Dhaka",
                "country": "Bangladesh",
                "id": 10,
                "name": "Najma",
                "address": "",
                "relation": "Mother",
                "birthDate": "1964-05-01",
                "mobile": "8801789963256",
                "percentage": 100,
                "isDeleted": false
            }
        ],
        "advanceSalary": [],
        "personalFiles": [],
        "currentLoginTime": "2024-12-27 15:26:54",
        "previousLoginTime": "2024-12-27 11:42:32",
        "attendanceRoasterAssignmentDate": "2023-11-07",
        "attendanceRoasterEffectiveDateForConditionalWeekend": null,
        "employmentType": {
            "id": 2,
            "employmentType": "Worker"
        },
        "holidayPolicyId": 1,
        "startingShiftId": null,
        "previousEmployeeId": null,
        "scheduledAttendanceRosterInfo": null,
        "employeeOrganization": {
            "id": 137,
            "employeeVisibleId": "200005",
            "employeeId": 200005,
            "organizationElements": [
                {
                    "id": 94,
                    "organizationElementType": {
                        "id": 3,
                        "label": "location"
                    },
                    "name": "Head Office",
                    "description": "Gulshan,  Road#10,Gulshan 5, Dhaka Division, 1212, Dhaka, Bangladesh",
                    "parentOrganizationId": 93,
                    "organizationDetailsEntity": "location",
                    "organizationDetailsEntityId": 1,
                    "organizationDetails": null
                },
                {
                    "id": 137,
                    "organizationElementType": {
                        "id": 2,
                        "label": "department"
                    },
                    "name": "PnR",
                    "description": "PnR",
                    "parentOrganizationId": 93,
                    "organizationDetailsEntity": "department",
                    "organizationDetailsEntityId": 4,
                    "organizationDetails": null
                },
                {
                    "id": 138,
                    "organizationElementType": {
                        "id": 7,
                        "label": "designation"
                    },
                    "name": "Physical Design Manager",
                    "description": "",
                    "parentOrganizationId": 137,
                    "organizationDetailsEntity": "designation",
                    "organizationDetailsEntityId": 17,
                    "organizationDetails": null
                },
                {
                    "id": 93,
                    "organizationElementType": {
                        "id": 1,
                        "label": "company"
                    },
                    "name": "Neural Semiconductor Limited",
                    "description": "We provide software testing and quality assurance services for your software, REST API and system. We do quality assurance by both manual and automated testing. We test if client's REST API conforms to API documentation.",
                    "parentOrganizationId": null,
                    "organizationDetailsEntity": "company",
                    "organizationDetailsEntityId": 1,
                    "organizationDetails": null
                }
            ],
            "organizationHierarchy": {
                "id": 3,
                "companyId": 1,
                "hierarchy": [
                    {
                        "id": 12,
                        "organizationElementType": {
                            "id": 1,
                            "label": "company"
                        },
                        "positionInHierarchy": 0
                    },
                    {
                        "id": 13,
                        "organizationElementType": {
                            "id": 2,
                            "label": "department"
                        },
                        "positionInHierarchy": 1
                    },
                    {
                        "id": 14,
                        "organizationElementType": {
                            "id": 3,
                            "label": "location"
                        },
                        "positionInHierarchy": 1
                    },
                    {
                        "id": 15,
                        "organizationElementType": {
                            "id": 7,
                            "label": "designation"
                        },
                        "positionInHierarchy": 2
                    },
                    {
                        "id": 16,
                        "organizationElementType": {
                            "id": 4,
                            "label": "division"
                        },
                        "positionInHierarchy": 1
                    },
                    {
                        "id": 17,
                        "organizationElementType": {
                            "id": 5,
                            "label": "section"
                        },
                        "positionInHierarchy": 1
                    },
                    {
                        "id": 18,
                        "organizationElementType": {
                            "id": 6,
                            "label": "subsection"
                        },
                        "positionInHierarchy": 1
                    }
                ]
            }
        },
        "hasDisciplinaryIncidents": false,
        "thumbnails_path_02": "img/200005thumb02.jpg",
        "thumbnails_path_01": "img/200005thumb01.jpg",
        "isProjectManager": null
    },
    "additionalAccessibility": {
        "hasOnboardingFlowAccess": false,
        "careerAccess": null,
        "hasFoodProgramSubscription": false,
        "canClockAttendance": true,
        "hasOtApproval": true,
        "additionalRoles": []
    }
}

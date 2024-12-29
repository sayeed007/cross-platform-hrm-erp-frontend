import moment, { Duration } from "moment";
import { Location, PresentAddress, User } from "../typeInterfaces/User";
import { FlatListNormalData } from "../components/profile/SingleFlatList";

export const generateTabWIseEmployeeDetails = (user: User) => {
    const dummyTabWiseEmployeeDetails = {
        'Company Details': [
            { title: 'Employee ID', value: user?.employeeInfo?.employeeVisibleId ? user?.employeeInfo?.employeeVisibleId : 'N/A' },
        ],
        'Office Policy': [
            // 'Attendance Roster Info':
            [],
            // 'Attendance Roster Info': - SCHEDULED DATA
            [],
            // 'Leave Policy info':
            [],
            // 'Holiday Policy info':
            [],
        ],
        'Compensation': [
            // 'Bank Info':
            [
                { title: 'Bank Name', value: user?.employeeInfo?.bankDetails?.bankName ? user?.employeeInfo?.bankDetails?.bankName : 'N/A' },
                { title: 'Branch Name', value: user?.employeeInfo?.bankDetails?.branchName ? user?.employeeInfo?.bankDetails?.branchName : 'N/A' },
                { title: 'Account No', value: user?.employeeInfo?.bankDetails?.accountNo ? user?.employeeInfo?.bankDetails?.accountNo : 'N/A' },
            ],
            // 'Benefit Info':
            [
                { title: 'Is Transport User', value: user?.employeeInfo?.officialBenefit?.isTransportUser ? 'YES' : 'NO' },
                user?.employeeInfo?.officialBenefit?.isTransportUser && {
                    title: 'Transport Route',
                    value: 'N/A'
                    //     allRouteAndPickupPoint?.find(
                    //     route => route.id === user?.employeeInfo?.officialBenefit?.transportRouteId
                    // )?.routeName || 'N/A',
                },
                user?.employeeInfo?.officialBenefit?.isTransportUser && {
                    title: 'Transport Pickup Point',
                    value: 'N/A'
                    //     allPickupPoint?.find(
                    //     pickupPoint => pickupPoint?.id === user?.employeeInfo?.officialBenefit?.transportPickupPointId
                    // )?.pickupPointName || 'N/A',
                },
                user?.employeeInfo?.officialBenefit?.isTransportUser && {
                    title: 'Transport Deduction Amount',
                    value: user?.employeeInfo?.officialBenefit?.transportDeductionAmount || 0,
                },
                user?.employeeInfo?.officialBenefit?.isTransportUser && {
                    title: 'Transport Using Start Date',
                    value: user?.employeeInfo?.officialBenefit?.transportUsingStartDate
                        ? moment(user?.employeeInfo?.officialBenefit?.transportUsingStartDate).format('Do MMMM YYYY')
                        : 'N/A',
                },
                { title: 'Is Tax Applicable', value: user?.employeeInfo?.officialBenefit?.isTaxApplicable ? 'YES' : 'NO' },
                { title: 'Advance Income Tax', value: user?.employeeInfo?.officialBenefit?.advanceIncomeTax || 'N/A' },
                { title: 'Has Investment', value: user?.employeeInfo?.officialBenefit?.hasInvestment ? 'YES' : 'NO' },
                { title: 'Has Provident Fund', value: user?.employeeInfo?.officialBenefit?.hasProvidentFund ? 'YES' : 'NO' },
                { title: 'Has LFA', value: user?.employeeInfo?.officialBenefit?.hasLFA ? 'YES' : 'NO' },
                user?.employeeInfo?.officialBenefit?.hasLFA && {
                    title: 'LFA Eligibility Date',
                    value: user?.employeeInfo?.officialBenefit?.lfaEligibilityDate
                        ? moment(user?.employeeInfo?.officialBenefit?.lfaEligibilityDate).format('Do MMMM YYYY')
                        : 'N/A',
                },
                { title: 'Has Gratuity', value: user?.employeeInfo?.officialBenefit?.hasGratuity ? 'YES' : 'NO' },
                { title: 'Has Dormitory', value: user?.employeeInfo?.officialBenefit?.hasDormitory ? 'YES' : 'NO' },
                { title: 'Has Bonus', value: user?.employeeInfo?.officialBenefit?.hasBonus ? 'YES' : 'NO' },
                user?.employeeInfo?.officialBenefit?.hasBonus && {
                    title: 'Bonus Percentage',
                    value: user?.employeeInfo?.officialBenefit?.bonusPercentage || 'N/A',
                },
                { title: 'Has Life Insurance', value: user?.employeeInfo?.officialBenefit?.hasLifeInsurance ? 'YES' : 'NO' },
                { title: 'Has Lunch Allowance', value: user?.employeeInfo?.officialBenefit?.hasLunchAllowance ? 'YES' : 'NO' },
                user?.employeeInfo?.officialBenefit?.hasLunchAllowance && {
                    title: 'Lunch Allowance Amount',
                    value: user?.employeeInfo?.officialBenefit?.lunchAllowanceAmount || 'N/A',
                },
                { title: 'Has Medical Insurance', value: user?.employeeInfo?.officialBenefit?.hasMedicalInsurance ? 'YES' : 'NO' },
                { title: 'Has Mobile Allowance', value: user?.employeeInfo?.officialBenefit?.hasMobileAllowance ? 'YES' : 'NO' },
                user?.employeeInfo?.officialBenefit?.hasMobileAllowance && {
                    title: 'Mobile No',
                    value: user?.employeeInfo?.officialBenefit?.mobileNumber || 'N/A',
                },
                user?.employeeInfo?.officialBenefit?.hasMobileAllowance && {
                    title: 'Mobile Balance Limit',
                    value: user?.employeeInfo?.officialBenefit?.mobileBalanceLimit || 'N/A',
                },
                user?.employeeInfo?.officialBenefit?.hasMobileAllowance && {
                    title: 'Mobile Allowance Effective Date',
                    value: user?.employeeInfo?.officialBenefit?.mobileAllowanceEffectiveDate
                        ? moment(user?.employeeInfo?.officialBenefit?.mobileAllowanceEffectiveDate).format('MMMM DD, YYYY')
                        : 'N/A',
                },
            ]
        ],
        'Nominee': [],
        'Personal Details': [
            { title: 'Father Name', value: user?.employeeInfo?.fatherName ? capitalizeFirstLetter(user?.employeeInfo?.fatherName) : 'N/A' },
            { title: 'Mother Name', value: user?.employeeInfo?.motherName ? capitalizeFirstLetter(user?.employeeInfo?.motherName) : 'N/A' },
            { title: 'Gender', value: user?.employeeInfo?.gender ? capitalizeFirstLetter(user?.employeeInfo?.gender) : 'N/A' },
            { title: 'Date of Birth', value: user?.employeeInfo?.birthDate ? moment(user?.employeeInfo?.birthDate).format("MMM DD, yyyy") : 'N/A' },
            { title: 'Original Date of Birth', value: user?.employeeInfo?.actualBirthDate ? moment(user?.employeeInfo?.actualBirthDate).format("Do MMMM") : 'N/A' },
            { title: 'Personal Email', value: user?.employeeInfo?.personalEmail ? user?.employeeInfo?.personalEmail : 'N/A' },
            { title: 'Nationality', value: user?.employeeInfo?.nationality ? capitalizeFirstLetter(user?.employeeInfo?.nationality) : 'N/A' },
            { title: 'NID Number', value: user?.employeeInfo?.nidNumber ? user?.employeeInfo?.nidNumber : 'N/A' },
            { title: 'TIN Number', value: user?.employeeInfo?.tinNumber ? user?.employeeInfo?.tinNumber : 'N/A' },
            { title: 'Religion', value: user?.employeeInfo?.religion ? capitalizeFirstLetter(user?.employeeInfo?.religion) : 'N/A' },
            { title: 'Blood Group', value: user?.employeeInfo?.bloodGroup ? user?.employeeInfo?.bloodGroup : 'N/A' },
            { title: 'Martial Status', value: user?.employeeInfo?.maritalStatus ? capitalizeFirstLetter(user?.employeeInfo?.maritalStatus) : 'N/A' },
            { title: 'Present Address', value: getAddress(user?.employeeInfo?.presentAddress) },
            { title: 'Permanent Address', value: getAddress(user?.employeeInfo?.permanentAddress) },
        ],
        'Education & Experience': [],
        'Emergency Info': [
            { title: 'Name', value: user?.employeeInfo?.econtact?.name ? capitalizeFirstLetter(user?.employeeInfo?.econtact?.name) : 'N/A' },
            { title: 'Relation', value: user?.employeeInfo?.econtact?.relation ? capitalizeFirstLetter(user?.employeeInfo?.econtact?.relation) : 'N/A' },
            { title: 'Mobile', value: user?.employeeInfo?.econtact?.mobile ? user?.employeeInfo?.econtact?.mobile : 'N/A' },
            { title: 'Email', value: user?.employeeInfo?.econtact?.email ? user?.employeeInfo?.econtact?.email : 'N/A' },
            {
                title: 'Address', value: getAddress({
                    id: user?.employeeInfo?.econtact?.id,
                    villageName: user?.employeeInfo?.econtact?.villageName,
                    buildingNo: user?.employeeInfo?.econtact?.buildingNo,
                    street: user?.employeeInfo?.econtact?.street,
                    state: user?.employeeInfo?.econtact?.state,
                    postalCode: user?.employeeInfo?.econtact?.postalCode,
                    city: user?.employeeInfo?.econtact?.city,
                    country: user?.employeeInfo?.econtact?.country,
                })
            },
        ],
        'Documents': [],
    };


    // ###################################################################
    // Company Details
    // SETTING ORGANIZATION HIERARCHY OF AN EMPLOYEE
    // ###################################################################
    user?.employeeInfo?.employeeOrganization?.organizationHierarchy?.hierarchy?.sort((a, b) => {
        // First, sort by positionInHierarchy
        if (a.positionInHierarchy !== b.positionInHierarchy) {
            return a.positionInHierarchy - b.positionInHierarchy;
        }
        // If positionInHierarchy is the same, sort by id
        return a.organizationElementType.id - b.organizationElementType.id;
    })?.map((organizationElement) => {
        if (organizationElement?.organizationElementType?.label === 'location') {
            dummyTabWiseEmployeeDetails['Company Details'].push({
                title: 'Location', value: user?.employeeInfo?.location?.[0]?.alias ? generateLocation(user?.employeeInfo?.location?.[0]) : 'N/A'
            })

        } else {
            dummyTabWiseEmployeeDetails['Company Details'].push({
                title: organizationElement?.organizationElementType?.label,
                value: (user?.employeeInfo?.employeeOrganization?.organizationElements?.filter((element) => element?.organizationElementType?.label === organizationElement?.organizationElementType?.label)?.[0]?.name)
                    ?
                    (user?.employeeInfo?.employeeOrganization?.organizationElements?.filter((element) => element?.organizationElementType?.label === organizationElement?.organizationElementType?.label)?.[0]?.name)
                    :
                    "N/A"
            })
        }
    });

    dummyTabWiseEmployeeDetails['Company Details'] = [
        ...dummyTabWiseEmployeeDetails['Company Details'],
        { title: 'Joining Date', value: user?.employeeInfo?.joiningDate ? user?.employeeInfo?.joiningDate : 'N/A' },
        { title: 'Probation Date', value: user?.employeeInfo?.probationStartDate ? moment(user?.employeeInfo?.probationStartDate).format("MMM DD, yyyy") : 'N/A' },
        { title: 'Confirmation Date', value: user?.employeeInfo?.confirmationDate ? moment(user?.employeeInfo?.confirmationDate).format("MMM DD, yyyy") : 'N/A' },
        { title: 'Service Length', value: CalculateLengthOfService(user) },
        { title: 'Official Email', value: user?.employeeInfo?.username ? user?.employeeInfo?.username : 'N/A' },
        { title: 'RFID', value: user?.employeeInfo?.uniqueTag ? user?.employeeInfo?.uniqueTag : 'N/A' },
        { title: 'Line Manager', value: user?.employeeInfo?.lineManagerName ? user?.employeeInfo?.lineManagerName : 'N/A' },
        { title: 'Dotted manager 1', value: user?.employeeInfo?.teamLeaderName ? user?.employeeInfo?.teamLeaderName : 'N/A' },
        { title: 'Dotted manager 2', value: user?.employeeInfo?.headOfDepartmentName ? user?.employeeInfo?.headOfDepartmentName : 'N/A' },
        {
            title: 'Employment Status', value: user?.employeeInfo?.employmentStatus ? (user?.employeeInfo?.employmentStatus.charAt(0).toUpperCase() +
                user?.employeeInfo?.employmentStatus.slice(1)) : 'N/A'
        },
        { title: 'Employment Type', value: user?.employeeInfo?.employmentType?.employmentType ? user?.employeeInfo?.employmentType?.employmentType : 'N/A' },
    ];


    // ###################################################################
    // Office Policy
    // ###################################################################
    // GENERATING OFFICE POLICY - ATTENDANCE ROSTER DATA
    const roasterInfo = {
        ...user?.employeeInfo?.attendanceRoaster,
        employeeId: user?.employeeInfo?.employeeId,
        attendanceRoasterEffectiveDateForConditionalWeekend: user?.employeeInfo?.attendanceRoasterEffectiveDateForConditionalWeekend,
        joiningDate: user?.employeeInfo?.joiningDate,
        attendanceRoasterAssignmentDate: user?.employeeInfo?.attendanceRoasterAssignmentDate,
        startingShiftId: user?.employeeInfo?.startingShiftId,
        scheduledAttendanceRosterInfo: user?.employeeInfo?.scheduledAttendanceRosterInfo,
    };

    let conditionalWeekend;
    let interval;
    let weekendDay;
    let nextConditionalWeekendDay;

    if (roasterInfo?.isConditionalWeekend) {
        conditionalWeekend = "Yes"
        if (roasterInfo.interval === "BIWEEKLY") {
            interval = "Bi-Weekly (14 Days)";
        } else if (roasterInfo.interval === "WEEKLY") {
            interval = "Weekly (7 Days)"
        };
        weekendDay = moment(roasterInfo?.attendanceRoasterEffectiveDateForConditionalWeekend).format('dddd');

        if (roasterInfo?.interval === "WEEKLY") {

            let nextDay = moment(roasterInfo?.attendanceRoasterEffectiveDateForConditionalWeekend).format('YYYY-MM-DD');
            while (moment().diff(moment(nextDay), 'days') > 0) {

                nextDay = moment(nextDay).add(7, 'days').format('YYYY-MM-DD');
            }
            nextConditionalWeekendDay = moment(nextDay).format('LL');

        } else if (roasterInfo?.interval === "BIWEEKLY") {
            let nextDay = moment(roasterInfo?.attendanceRoasterEffectiveDateForConditionalWeekend).format('YYYY-MM-DD');
            while (moment().diff(moment(nextDay), 'days') > 0) {

                nextDay = moment(nextDay).add(14, 'days').format('YYYY-MM-DD');
            }
            nextConditionalWeekendDay = moment(nextDay).format('LL');
        }
    };

    const attendanceRosterData = [];

    if (roasterInfo?.roasterType !== "SHIFTING") {
        const rosterDetails = [
            { title: 'Shift Name', value: roasterInfo.shiftName || "N/A" },
            { title: 'Office Start Time', value: roasterInfo.officeStartTime || "N/A" },
            { title: 'Office End Time', value: roasterInfo.officeEndTime || "N/A" },
            { title: 'Late Time', value: roasterInfo.lateTime || "N/A" },
            //    if employee based weekends exist, show it, else show roster common weekends for all
            {
                title: 'Weekends',
                value: (user?.employeeInfo?.attendanceRosterWeekends?.length > 0
                    ? weekJoinByComma(user?.employeeInfo?.attendanceRosterWeekends)
                    : weekJoinByComma(roasterInfo?.weekends)) || "N/A"
            },
        ];
        attendanceRosterData.push(...rosterDetails);
    } else {
        const shiftDetails = [
            { title: 'Roster Name', value: roasterInfo?.shiftName },
            {
                title: 'Rolling', value: roasterInfo?.rollingType.includes('_') ?
                    roasterInfo?.rollingType?.[0]?.toUpperCase() + roasterInfo?.rollingType?.slice(1)?.replace('_', ' ')?.toLowerCase()
                    :
                    roasterInfo?.rollingType?.[0]?.toUpperCase() + roasterInfo?.rollingType?.slice(1)?.toLowerCase()
            },
            { title: 'Weekend', value: weekJoinByComma(roasterInfo?.weekends) },
            {
                title: 'Starting Shift', value:
                    roasterInfo?.startingShiftId
                        ? (roasterInfo?.shiftTimeInformations?.filter((shift) => shift?.id === roasterInfo?.startingShiftId))?.[0]?.shiftName
                        : 'N/A'
            },
            {
                title: 'Roster Starts From', value:
                    roasterInfo?.attendanceRoasterAssignmentDate
                        ? moment(roasterInfo?.attendanceRoasterAssignmentDate, 'YYYY-MM-DD').format('MMM DD, YYYY')
                        : 'N/A'
            },
        ];
        attendanceRosterData.push(...shiftDetails);
    };


    // IF ROSTER HAS CONDITIONAL WEEKEND
    if (roasterInfo.isConditionalWeekend) {
        const conditionalWeekendDetails = [
            { title: 'Is Conditional Weekend', value: conditionalWeekend },
            { title: 'Conditional Weekend Day', value: weekendDay },
            { title: 'Interval', value: interval },
            { title: 'Next Conditional Weekend', value: nextConditionalWeekendDay },
        ];
        attendanceRosterData.push(...conditionalWeekendDetails);
    };

    // IF ROSTER HAS HALF DAY
    if (roasterInfo.isConditionalWeekend) {
        const halfDayDetails = [
            { title: 'Has Half Day', value: roasterInfo?.hasHalfDay === true ? 'Yes' : 'No' },
            { title: 'Half Day', value: roasterInfo?.halfDays?.[0] },
            { title: 'Half Day End Time', value: roasterInfo.halfDayEndTime },
        ];
        attendanceRosterData.push(...halfDayDetails);
    };
    dummyTabWiseEmployeeDetails['Office Policy'][0] = [...attendanceRosterData];


    // IF ROSTER HAS SCHEDULER ROSTER ASSIGN
    const scheduledAttendanceRosterInfo = []
    if (roasterInfo.scheduledAttendanceRosterInfo) {
        const scheduledAttendanceRosterInfoDetails = [
            { title: 'Schedule Effective Date', value: moment(roasterInfo?.scheduledAttendanceRosterInfo?.rosterEffectiveFrom).format('MMM DD, YYYY') },
            { title: 'Next Roaster', value: roasterInfo?.scheduledAttendanceRosterInfo?.scheduledAttendanceRoster?.shiftName },
            {
                title: 'Next Weekends', value: roasterInfo?.scheduledAttendanceRosterInfo?.attendanceRosterWeekends?.length > 0
                    ? weekJoinByComma(roasterInfo?.scheduledAttendanceRosterInfo?.attendanceRosterWeekends)
                    : weekJoinByComma(roasterInfo?.scheduledAttendanceRosterInfo?.scheduledAttendanceRoster?.weekends)
            },
        ];
        scheduledAttendanceRosterInfo.push(...scheduledAttendanceRosterInfoDetails);


        if (roasterInfo?.scheduledAttendanceRosterInfo?.scheduledConditionWeekend) {
            const scheduledAttendanceRosterInfoWithScheduledConditionWeekendDetails = [
                { title: 'Has Conditional Weekend', value: moment(roasterInfo?.scheduledAttendanceRosterInfo?.rosterEffectiveFrom).format('MMM DD, YYYY') },
                { title: 'Conditional Weekend Effective Date', value: moment(roasterInfo?.scheduledAttendanceRosterInfo?.conditionalWeekendEffectiveFrom).format('MMM DD, YYYY') },
                {
                    title: 'Next Conditional Weekend', value: moment(roasterInfo?.scheduledAttendanceRosterInfo?.scheduledConditionWeekend).format('MMM DD, YYYY')
                },
            ];
            scheduledAttendanceRosterInfo.push(...scheduledAttendanceRosterInfoWithScheduledConditionWeekendDetails);
        };
    };
    dummyTabWiseEmployeeDetails['Office Policy'][1] = [...scheduledAttendanceRosterInfo];


    // ###################################################################
    // Compensation
    // ###################################################################



    // ###################################################################
    // NOMINEE
    // GENERATING NOMINEE DATA
    // ###################################################################
    const nominees: FlatListNormalData[][] = [];
    user?.employeeInfo?.nominee?.forEach((nominee) => {
        nominees.push(
            [
                { title: 'Name', value: nominee?.name ? capitalizeFirstLetter(nominee?.name) : 'N/A' },
                { title: 'Relation', value: nominee?.relation ? capitalizeFirstLetter(nominee?.relation) : 'N/A' },
                { title: 'Mobile', value: nominee?.mobile ? nominee?.mobile : 'N/A' },
                {
                    title: 'Address', value: getAddress({
                        id: nominee?.id,
                        villageName: nominee?.villageName,
                        buildingNo: nominee?.buildingNo,
                        street: nominee?.street,
                        state: nominee?.state,
                        postalCode: nominee?.postalCode,
                        city: nominee?.city,
                        country: nominee?.country,
                    })
                },
                { title: 'Date of birth', value: nominee?.birthDate ? moment(nominee?.birthDate).format("MMM DD, yyyy") : 'N/A' },
                { title: 'Percentage', value: nominee?.percentage ? nominee?.percentage : 'N/A' }
            ]
        )
    });
    dummyTabWiseEmployeeDetails['Nominee'] = [...nominees];


    return dummyTabWiseEmployeeDetails;
};



export const generateLocation = (location: Location) => {
    // Extract all fields that might be part of the location
    const fields = [
        location.address,
        location.street,
        location.city,
        location.state,
        location.postalCode,
        location.country
    ];

    // Filter out empty strings or undefined/null values
    const nonEmptyFields = fields.filter(field => field && field.trim() !== "");

    // Join the non-empty fields with a comma and space
    return nonEmptyFields.join(", ");
};

export const CalculateLengthOfService = (user: User | null | undefined): string => {
    const joiningDate = user?.employeeInfo?.joiningDate;

    if (joiningDate) {
        const currentDate = moment();
        const diff = currentDate.diff(moment(joiningDate), 'milliseconds');
        const duration: Duration = moment.duration(diff);

        // Handle potential negative values for days, months, or years
        const years = Math.max(0, duration.years());
        const months = Math.max(0, duration.months());
        const days = Math.max(0, duration.days());

        return `${years} years, ${months} months, ${days + 1} days`;
    }

    return 'N/A';
};

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) {
        return ''; // Handle empty string case
    }
    const [first, ...rest] = str;
    return [first.toUpperCase(), ...rest].join('');
};

export const getAddress = (address: PresentAddress): string => {
    const { villageName, buildingNo, street, state, postalCode, city, country } = address;

    // Concatenate the address parts, defaulting to "N/A" if a part is missing
    const addressParts = [
        villageName || "",
        buildingNo || "",
        street || "",
        state || "",
        postalCode || "",
        city || "",
        country || "",
    ];

    // Filter out empty strings and join non-empty address parts with " | "
    const filteredParts = addressParts.filter(part => part.trim() !== "");

    // Return the joined parts or "N/A" if all are empty
    return filteredParts.length > 0 ? filteredParts.join(" | ") : "N/A";
};


export const weekJoinByComma = (list: string[]) => {
    return list?.length > 0 ? list?.join(", ") : 'N/A';
}

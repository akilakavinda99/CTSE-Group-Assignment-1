
export const validateNewNotice = (values) => {
    var errors = {};
    if (!values.subject) {
        errors.subject = "Subject is required";
    } else if (values.subject.length < 3) {
        errors.subject = "Subject must be at least 3 characters";
    } else if (values.subject.length > 50) {
        errors.subject = "Subject must be less than 50 characters. (" + values.subject.length + "/50)";
    }

    if (!values.community) {
        errors.community = "Community is required";
    }

    return errors;
}
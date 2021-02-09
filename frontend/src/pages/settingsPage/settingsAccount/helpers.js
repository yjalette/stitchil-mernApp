export const handleResponse = (response, res_success, res_failure) => {
    if (response.code && response.message) res_failure(response.message);
    if (response.success) res_success(response.message);
}

export const success_msg = "successfully updated!";

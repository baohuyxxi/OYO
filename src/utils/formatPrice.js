const formatPrice = (value) => {
    return `${new Intl.NumberFormat('vi-VN').format(parseInt(value))} VND`
}

export default formatPrice
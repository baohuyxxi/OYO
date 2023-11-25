export const addressFormData = (() => {
  const addressSelect = localStorage.getItem("addressSelect");
  return addressSelect ?JSON.parse(addressSelect) :
    {province: null,
      district: null,
      ward : null}
});

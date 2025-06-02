// ** React
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

//**Form */
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"



interface TCreateEditProductType {
    open: boolean
    onClose: () => void
    isProductType?: string
}

type TDefaultValues = {
    name: string
    slug: string
}
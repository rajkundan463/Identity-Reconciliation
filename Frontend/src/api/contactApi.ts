// src/api/contactApi.ts

import { apiClient } from "./client"
import type { IdentifyResponse } from "../types/contact"

export const identifyContact =
async (
  email?: string,
  phoneNumber?: string
) => {

  const res =
    await apiClient.post<IdentifyResponse>(
      "/identify",
      { email, phoneNumber }
    )

  return res.data
}

export const getContact =
async (id: number) => {

  const res =
    await apiClient.get<IdentifyResponse>(
      `/contacts/${id}`
    )

  return res.data
}
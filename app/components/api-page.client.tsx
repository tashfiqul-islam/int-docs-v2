"use client";

import { defineClientConfig } from "fumadocs-openapi/ui/client";

const AUTH_TOKEN_KEY = "fn_api_auth_token";

interface AuthField {
  fieldName: string;
  defaultValue: unknown;
  original?: {
    type?: string;
    scheme?: string;
  };
  children: React.ReactNode;
  mapOutput?: (values: unknown) => unknown;
}

function extractToken(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.startsWith("Bearer ") ? trimmed.substring(7).trim() : trimmed;
}

function storeToken(fieldName: string, value: unknown): void {
  if (typeof window === "undefined") {
    return;
  }
  const token = extractToken(value);
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }
  if (fieldName === "query.access_token") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

function transformRestToken(
  field: AuthField,
  shared: string | null
): AuthField {
  const current =
    typeof field.defaultValue === "string" ? field.defaultValue : "";
  const defaultValue = current || shared || "";
  const mapOutput = (val: unknown): string => {
    const token = typeof val === "string" ? val.trim() : "";
    storeToken(field.fieldName, token);
    return token;
  };
  return { ...field, defaultValue, mapOutput };
}

function transformWebhookBearer(
  field: AuthField,
  shared: string | null
): AuthField {
  const current =
    typeof field.defaultValue === "string" ? field.defaultValue : "";
  const hasBearer = current.startsWith("Bearer ");
  let defaultValue = "Bearer ";
  if (hasBearer && current.trim().length > "Bearer".length) {
    defaultValue = current;
  } else if (shared) {
    defaultValue = `Bearer ${shared}`;
  }
  const mapOutput = (val: unknown): string => {
    const raw = typeof val === "string" ? val.trim() : "";
    storeToken(field.fieldName, raw);
    if (!raw) {
      return "Bearer ";
    }
    return raw.startsWith("Bearer ") ? raw : `Bearer ${raw}`;
  };
  return { ...field, defaultValue, mapOutput };
}

export default defineClientConfig({
  playground: {
    transformAuthInputs: (fields: AuthField[]): AuthField[] => {
      if (typeof window === "undefined") {
        return fields;
      }
      const shared = localStorage.getItem(AUTH_TOKEN_KEY);
      return fields.map((field) => {
        if (field.fieldName === "query.access_token") {
          return transformRestToken(field, shared);
        }
        if (
          field.fieldName === "header.Authorization" &&
          field.original?.type === "http" &&
          field.original?.scheme === "bearer"
        ) {
          return transformWebhookBearer(field, shared);
        }
        return field;
      });
    },
  },
});

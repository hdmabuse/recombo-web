"use client";

import { useState, useEffect } from "react";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "multiselect"
  | "url"
  | "email";

interface FieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string[] | null;
  defaultValue: string | null;
  visible: boolean;
}

interface DynamicFormProps {
  entity: string;
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

export function DynamicForm({ entity, values, onChange }: DynamicFormProps) {
  const [fields, setFields] = useState<FieldDefinition[]>([]);

  useEffect(() => {
    fetch(`/api/admin/fields?entity=${entity}`)
      .then((res) => res.json())
      .then((data) => setFields(data.filter((f: FieldDefinition) => f.visible)));
  }, [entity]);

  if (fields.length === 0) return null;

  const handleChange = (name: string, value: unknown) => {
    onChange({ ...values, [name]: value });
  };

  const renderField = (field: FieldDefinition) => {
    const value = values[field.name];

    switch (field.type) {
      case "boolean":
        return (
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => handleChange(field.name, e.target.checked)}
              className="rounded border-zinc-300"
            />
            <span className="text-sm text-zinc-600">
              {field.defaultValue === "true" ? "Sim" : "Não"}
            </span>
          </label>
        );

      case "select":
        return (
          <select
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          >
            <option value="">Selecione...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        const selected = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {field.options?.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...selected, opt]
                      : selected.filter((v: string) => v !== opt);
                    handleChange(field.name, newValue);
                  }}
                  className="rounded border-zinc-300"
                />
                <span className="text-sm text-zinc-700">{opt}</span>
              </label>
            ))}
          </div>
        );

      case "textarea":
        return (
          <textarea
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            rows={4}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || null)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      case "date":
        return (
          <input
            type="date"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      case "datetime":
        return (
          <input
            type="datetime-local"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      case "url":
        return (
          <input
            type="url"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      case "email":
        return (
          <input
            type="email"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder="email@exemplo.com"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );

      default:
        return (
          <input
            type="text"
            value={(value as string) || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
        );
    }
  };

  return (
    <div className="mt-4 space-y-4 border-t border-zinc-200 pt-4">
      <h3 className="text-sm font-medium text-zinc-700">Campos Customizados</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Save, X, ChevronUp, ChevronDown } from "lucide-react";

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
  entity: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options: string[] | null;
  defaultValue: string | null;
  order: number;
  visible: boolean;
}

const ENTITIES = ["Artwork", "Artist", "Event", "Interview"];
const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texto" },
  { value: "textarea", label: "Texto Longo" },
  { value: "number", label: "Número" },
  { value: "date", label: "Data" },
  { value: "datetime", label: "Data e Hora" },
  { value: "boolean", label: "Sim/Não" },
  { value: "select", label: "Seleção Única" },
  { value: "multiselect", label: "Múltipla Seleção" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
];

export default function FieldsPage() {
  const [fields, setFields] = useState<FieldDefinition[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterEntity, setFilterEntity] = useState<string>("all");

  const [form, setForm] = useState({
    entity: "Artwork",
    name: "",
    label: "",
    type: "text" as FieldType,
    required: false,
    options: "",
    defaultValue: "",
    order: 0,
    visible: true,
  });

  useEffect(() => {
    fetchFields();
  }, []);

  async function fetchFields() {
    const res = await fetch("/api/admin/fields");
    const data = await res.json();
    setFields(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...form,
      options: form.options ? form.options.split(",").map((o) => o.trim()) : null,
    };

    const res = await fetch("/api/admin/fields", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    if (res.ok) {
      fetchFields();
      resetForm();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este campo?")) return;

    const res = await fetch(`/api/admin/fields?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchFields();
  }

  function handleEdit(field: FieldDefinition) {
    setEditingId(field.id);
    setForm({
      entity: field.entity,
      name: field.name,
      label: field.label,
      type: field.type,
      required: field.required,
      options: field.options?.join(", ") || "",
      defaultValue: field.defaultValue || "",
      order: field.order,
      visible: field.visible,
    });
    setShowForm(true);
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm({
      entity: "Artwork",
      name: "",
      label: "",
      type: "text",
      required: false,
      options: "",
      defaultValue: "",
      order: 0,
      visible: true,
    });
  }

  const filteredFields =
    filterEntity === "all" ? fields : fields.filter((f) => f.entity === filterEntity);

  const groupedFields = filteredFields.reduce(
    (acc, field) => {
      if (!acc[field.entity]) acc[field.entity] = [];
      acc[field.entity].push(field);
      return acc;
    },
    {} as Record<string, FieldDefinition[]>,
  );

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">Campos Customizados</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Novo Campo
        </button>
      </div>

      <div className="mb-4 flex gap-2">
        <select
          value={filterEntity}
          onChange={(e) => setFilterEntity(e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
        >
          <option value="all">Todas as Entidades</option>
          {ENTITIES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg border border-zinc-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-900">
                {editingId ? "Editar Campo" : "Novo Campo"}
              </h2>
              <button onClick={resetForm} className="text-zinc-400 hover:text-zinc-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">Entidade</label>
                <select
                  value={form.entity}
                  onChange={(e) => setForm({ ...form, entity: e.target.value })}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  required
                >
                  {ENTITIES.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Nome (slug)
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value.toLowerCase().replace(/\s+/g, "_") })
                    }
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="nome_campo"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Rótulo</label>
                  <input
                    type="text"
                    value={form.label}
                    onChange={(e) => setForm({ ...form, label: e.target.value })}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="Nome exibido"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as FieldType })}
                  className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              {(form.type === "select" || form.type === "multiselect") && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Opções (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={form.options}
                    onChange={(e) => setForm({ ...form, options: e.target.value })}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    placeholder="opção1, opção2, opção3"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Ordem</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">
                    Valor Padrão
                  </label>
                  <input
                    type="text"
                    value={form.defaultValue}
                    onChange={(e) => setForm({ ...form, defaultValue: e.target.value })}
                    className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.required}
                    onChange={(e) => setForm({ ...form, required: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-zinc-700">Obrigatório</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-zinc-700">Visível</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white transition-colors hover:bg-zinc-800"
                >
                  <Save className="h-4 w-4" />
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fields List */}
      {Object.entries(groupedFields).map(([entity, entityFields]) => (
        <div key={entity} className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-zinc-800">{entity}</h2>
          <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
            <table className="w-full">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Ordem
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Campo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Tipo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Obrigatório
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {entityFields
                  .sort((a, b) => a.order - b.order)
                  .map((field) => (
                    <tr key={field.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 text-sm text-zinc-600">{field.order}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-zinc-900">{field.label}</div>
                        <div className="text-xs text-zinc-500">{field.name}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-600">
                        {FIELD_TYPES.find((t) => t.value === field.type)?.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-600">
                        {field.required ? "Sim" : "Não"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(field)}
                          className="p-1 text-zinc-400 hover:text-amber-600"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(field.id)}
                          className="ml-2 p-1 text-zinc-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                {entityFields.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                      Nenhum campo customizado para {entity}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

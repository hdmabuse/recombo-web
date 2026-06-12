import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table, Thead, Th, Tbody, Tr, Td } from "@/components/ui";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Status</Th>
          <Th>Ano</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td className="font-medium">Obra Exemplo</Td>
          <Td>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              Publicado
            </span>
          </Td>
          <Td>2024</Td>
        </Tr>
        <Tr>
          <Td className="font-medium">Outra Obra</Td>
          <Td>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700">
              Rascunho
            </span>
          </Td>
          <Td>2023</Td>
        </Tr>
      </Tbody>
    </Table>
  ),
};

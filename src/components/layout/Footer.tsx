import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="mb-4 text-lg font-bold text-white">re:combo</h3>
            <p className="max-w-md text-sm leading-relaxed">
              O arquivo digital do coletivo Re:combo (2001-2008), pioneiro em produção artística
              colaborativa via internet. O projeto propõe o resgate e revitalização do acervo,
              conectando memória digital, software livre e generosidade intelectual.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com/recombo"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:contato@recombo.art.br"
                className="transition-colors hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-medium text-white">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/arquivo" className="transition-colors hover:text-white">
                  Acervo
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="transition-colors hover:text-white">
                  Linha do Tempo
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="transition-colors hover:text-white">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="/rede" className="transition-colors hover:text-white">
                  Rede
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="transition-colors hover:text-white">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* License */}
          <div>
            <h4 className="mb-4 font-medium text-white">Licença</h4>
            <p className="text-sm leading-relaxed">
              Todo o conteúdo do acervo está disponível sob a Licença de Uso Completo Re:combo
              (LUCR), baseada nos princípios de
              <a
                href="https://creativecommons.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 text-zinc-300 hover:text-white"
              >
                Creative Commons
              </a>
              e software livre.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="rounded bg-zinc-800 px-2 py-1">LUCR</span>
              <span className="rounded bg-zinc-800 px-2 py-1">CC-BY</span>
              <span className="rounded bg-zinc-800 px-2 py-1">Open Source</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} RE:COMBO. Projeto cultural sem fins lucrativos.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacidade" className="transition-colors hover:text-white">
              Privacidade
            </Link>
            <Link href="/termos" className="transition-colors hover:text-white">
              Termos
            </Link>
            <a
              href="https://github.com/recombo/recombo-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-white"
            >
              Código aberto
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

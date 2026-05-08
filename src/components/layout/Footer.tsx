import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-bold text-lg mb-4">re:combo</h3>
            <p className="text-sm leading-relaxed max-w-md">
              O arquivo digital do coletivo Re:combo (2001-2008), pioneiro em produção 
              artística colaborativa via internet. O projeto propõe o resgate e 
              revitalização do acervo, conectando memória digital, software livre 
              e generosidade intelectual.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/recombo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@recombo.art.br"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/arquivo" className="hover:text-white transition-colors">
                  Acervo
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-white transition-colors">
                  Linha do Tempo
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="hover:text-white transition-colors">
                  Mapa
                </Link>
              </li>
              <li>
                <Link href="/rede" className="hover:text-white transition-colors">
                  Rede
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* License */}
          <div>
            <h4 className="text-white font-medium mb-4">Licença</h4>
            <p className="text-sm leading-relaxed">
              Todo o conteúdo do acervo está disponível sob a Licença de Uso 
              Completo Re:combo (LUCR), baseada nos princípios de 
              <a 
                href="https://creativecommons.org" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white mx-1"
              >
                Creative Commons
              </a>
              e software livre.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-zinc-800 rounded">LUCR</span>
              <span className="px-2 py-1 bg-zinc-800 rounded">CC-BY</span>
              <span className="px-2 py-1 bg-zinc-800 rounded">Open Source</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} RE:COMBO. Projeto cultural sem fins lucrativos.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-white transition-colors">
              Termos
            </Link>
            <a 
              href="https://github.com/recombo/recombo-web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Código aberto
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
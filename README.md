# Devstie Boilerplate

Devstie Boilerplate é um projeto de código aberto desenvolvido pela comunidade Dev's Café. Nosso objetivo é fornecer um ponto de partida rápido e acessível para comunidades de desenvolvedores que desejam criar e hospedar seus próprios sites e blogs, mesmo com pouca experiência ou recursos.

A ideia primaria é construir um tamplate mais simples e plano possivel e funcional para cada pessoa poder implementar sua ideia desing.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework de React para desenvolvimento web focado em performance e escalabilidade.
- **Notion**: Usado como base de dados para armazenar posts de blog, eventos e outros conteúdos dinâmicos.
- **Vercel**: Plataforma de hospedagem que facilita o deploy de aplicações Next.js com integração contínua.

## 📋 Funcionalidades

- **Blog**: Publique posts usando o Notion como editor de conteúdo.
- **Eventos**: Liste eventos e mantenha sua comunidade atualizada.
- **SEO Amigável**: Otimizado para mecanismos de busca com suporte a meta tags dinâmicas.
- **Responsivo**: Design adaptável a diversos dispositivos.

## 🛠️ Pré-requisitos

- Node.js instalado na máquina (recomendado: versão 18+)
- Conta no Notion e uma página configurada para uso como base de dados
- Conta na Vercel para deploy e hospedagem

## 🏃‍♂️ Como Iniciar

Crie uma conta no notion, e crie 3 tabelas:
| Nome           | Email                  | Bio                    | Foto                 |
|----------------|------------------------|------------------------|----------------------|
| John Doe       | john@example.com       | Desenvolvedor Frontend | ![Foto](link_foto)   |
| Jane Smith     | jane@example.com       | Engenheira de Software | ![Foto](link_foto)   |
| Carlos Silva   | carlos@example.com     | Escritor Técnico       | ![Foto](link_foto)   |



| Título               | Autor         | Data        | Visível | Categoria   | Conteúdo                  |
|----------------------|---------------|-------------|---------|-------------|---------------------------|
| Introdução ao Next.js| John Doe      | 2024-09-01  | Sim     | Tutorial    | ![Link do Post](#)        |
| Como usar o Notion   | Jane Smith    | 2024-08-25  | Não     | Guia        | ![Link do Post](#)        |
| Organizando Eventos  | Carlos Silva  | 2024-09-05  | Sim     | Artigo      | ![Link do Post](#)        |



| Nome do Evento      | Data        | Localização           | Descrição                | Organizador    |
|---------------------|-------------|-----------------------|--------------------------|----------------|
| Meetup Dev's Café   | 2024-09-10  | Online via Zoom       | Encontro da comunidade   | John Doe       |
| Workshop Next.js    | 2024-09-15  | São Paulo, Brasil     | Workshop de Next.js      | Jane Smith     |
| Hackathon Devs      | 2024-09-20  | Rio de Janeiro, Brasil| Hackathon para iniciantes| Carlos Silva   |



1. Clone o repositório:

    ```bash
    git clone https://github.com/sua-conta/devstie-boilerplate.git
    ```

2. Instale as dependências:

    ```bash
    cd devstie-boilerplate
    npm install
    ```

3. Configure o arquivo `.env.local` com as credenciais necessárias:

    ```env
    NOTION_API_KEY=seu_token_do_notion
    DATABASE_ID=id_da_base_de_dados
    ```

4. Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

5. Acesse no navegador:

    ```
    http://localhost:3000
    ```

## 📤 Deploy na Vercel

1. Faça login na Vercel.
2. Conecte seu repositório GitHub com o projeto.
3. Configure as variáveis de ambiente na Vercel com as credenciais do Notion.
4. Clique em "Deploy".

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests com sugestões, melhorias ou correções.

## 📜 Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com a comunidade Dev's Café através do nosso [Discord](https://devscafe.pt/discord).

---

Feito com 💜 pela comunidade Dev's Café.

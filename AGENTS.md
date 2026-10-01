# Contexto do projeto

Este projeto é uma atividade acadêmica do curso de Bacharelado em Sistemas de Informação do IFMG Campus Ouro Branco.

O objetivo é apresentar um mapa conceitual digital relacionando:

- carreiras;
- disciplinas;
- áreas/eixos de formação;
- matriz curricular.

Os dados acadêmicos foram derivados do PPC do curso.

## Stack

Use apenas:

- HTML
- CSS
- JavaScript puro

Não introduza frameworks, bibliotecas de UI ou dependências sem necessidade.

## Direção visual

O projeto deve ter aparência acadêmica, minimalista e editorial.

Evite:

- visual de dashboard SaaS;
- aparência típica de site gerado por IA;
- gradientes;
- glassmorphism;
- excesso de cards;
- excesso de sombras;
- muitos badges;
- excesso de bordas arredondadas;
- elementos decorativos sem função;
- textos auxiliares desnecessários.

Prefira:

- fundo claro;
- tipografia simples;
- bastante espaço em branco;
- bordas discretas;
- poucos níveis de hierarquia;
- verde institucional do IFMG como cor principal;
- cores dos eixos somente quando forem úteis para identificação.

## Experiência principal

A interação principal do site é:

1. usuário visualiza as Trilhas de Carreira;
2. seleciona uma carreira;
3. Conexões Interativas mostram apenas disciplinas relacionadas;
4. a Matriz Curricular destaca as mesmas disciplinas;
5. usuário entende a relação entre aquela carreira e a formação do curso.

A seleção de carreira deve controlar as demais visualizações.

## Regras atuais da interface

- Não deve existir footer.
- O título deve ser:
  "Mapa Conceitual BSI IFMG - Campus Ouro Branco"
- Não deve existir barra de pesquisa.
- Não deve existir `axis-filter-bar`.
- Trilhas de Carreira devem permanecer visíveis e ser o foco principal.
- Conexões Interativas devem depender da carreira selecionada.
- Quando nenhuma carreira estiver selecionada, mostrar um estado vazio simples.
- A Matriz Curricular não deve usar setas para indicar relação com carreiras.
- Na Matriz Curricular, apenas destaque visualmente as disciplinas relacionadas.
- As linhas das Conexões Interativas nunca devem ultrapassar seu container.
- Mudanças de tamanho da janela devem recalcular corretamente as conexões.

## Código

Antes de alterar algo:

- entenda a implementação atual;
- preserve os dados acadêmicos existentes;
- evite reescrever partes funcionais sem necessidade;
- prefira simplificar em vez de adicionar abstrações.

Ao concluir:

- verifique erros no console;
- teste troca entre diferentes carreiras;
- teste redimensionamento da janela;
- confirme que conexões antigas são removidas corretamente;
- confira comportamento em desktop e mobile.

Não altere informações acadêmicas apenas por razões visuais.
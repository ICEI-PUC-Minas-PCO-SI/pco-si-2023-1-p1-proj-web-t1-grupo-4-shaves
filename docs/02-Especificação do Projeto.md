# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas



1 - Samuel Nogueira tem 30 anos e é barbeiro a 10 anos, desde criança sempre foi muito competitivo, e seus pais sempre o incentivaram a fazer as coisas bem feitas. Atualmente trabalha como barbeiro e tem como capital através do mercado de investimentos. Já participou de diversos campeonatos de cortes masculinos.

2 - Enzo Ezaquiel tem 9 anos, é de uma família de classe média alta, está no terceiro ano do ensino fundamental, fica irritado quando não tem o que quer de imediato, passa o dia inteiro no celular e tem o desejo de se tornar um pro player de free fire, odeia estudar e ama comer besteiras.

3 - Yago Campos tem 36 anos e é pai de duas meninas e é divorciado, ama praticar esportes e ser melhor que puder todos os dias. É apaixonado por futebol e joga desde criança. Uma das suas frustrações é pela sua queda de cabelo eminente e que não consegue achar um salão que te ajude a melhorar isso, ele busca aumentar sua autoestima achando uma barbearia que o deixe satisfeito com a sua aparência.

4 - Washington Dias tem 27 anos e é músico, tem grande vaidade e procura ao máximo cuidar do seu corpo, ele possui grande aptidão para aprender novos instrumentos além dos que já possui conhecimento e tem como paixão a música. Washington gosta de sempre se reunir com seus amigos e tem bastante convivência com outros músicos desde a sua infância. Apesar de todas as qualidades, Washington tem um sério problema em não ser muito bem compreendido e tem isso como frustração.

5 - Roger Raffari tem 41 anos e é dono da barbearia Golden Hair, ele possui grande experiência no ramo, vem atuando na área a pelo menos dez anos e tem como objetivo e motivação sempre prestar um bom serviço aos seus clientes. Roger possui vida econômica ativa no mercado de investimentos e tem como hobbies jogar futebol, assim como também gosta de acompanhar enquanto toma uma cervejinha gelada. Apesar de dar seu máximo em prol da barbearia, Roger se sente um tanto quanto incapaz e odeia ser desorganizado, prezando sempre pela organização da barbearia e dos seus funcionários. 

6 - Antônio tem 14 anos e é uma criança autista, o transtorno foi descoberto ainda quando criança. Antônio gosta de jogar videogame e sair para lugares calmos e não turbulentos, é muito amoroso com os pais mas odeia pessoas e lugares novos. Apesar do seu bom desempenho na escola é notável que ele odeia ir para aula,desde muito novo sua mãe nunca encontrou um barbeiro especializado para atendê-lo.

 7 - Michael tem 28 anos é barbeiro da Golden Hair a 3 anos, ele possui uma grande experiência no ramo da barbearia e é especializado em cortes de crianças com alguma necessidade especial. Além de seu serviço como barbeiro Michael presta serviços comunitários sempre que pode, e ama se exercitar. Sempre que pode tenta evoluir na profissão mostrando total dedicação ao seu trabalho.


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`        | QUERO/PRECISO ... `FUNCIONALIDADE`                           | PARA ... `MOTIVO/VALOR`                                      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Usuário do sistema          | Ver todos os serviços oferecidos pela barbearia e marcar um horário. | Quero ter a possibilidade de escolher entre diversos cortes e estilos de barba. |
| Usuário do sistema          | Escolher o barbeiro melhor capacitado, para o meu filho.     | Quero que meu filho se sinta bem com o seu cabelo.           |
| Usuário do sistema          | Marcar meus cortes de forma rápida e efetiva.                | Quero evitar filas e organizar melhor meus compromissos.     |
| Usuário do sistema          | Marcar meus cortes com um barbeiro específico.               | Quero cortar com meu barbeiro fixo.                          |
| Usuário do sistema barbeiro | Ver os meus clientes do dia de forma organizada e postar meus cortes. | Manter a organização do meu dia e impulsionar minha carreira. |
| Administrador               | Aumentar a produtividade dos barbeiros, e dar agilidade e organização para todos os clientes. | Impulsionar os ganhos da barbearia, melhor organização do ambiente de trabalho. |



As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.



### Requisitos Funcionais

| ID     | Descrição do Requisito                     | Prioridade |
| ------ | ------------------------------------------ | ---------- |
| RF-001 | Criar conta                                | ALTA       |
| RF-002 | Alterar informação conta                   | ALTA       |
| RF-003 | Excluir conta                              | ALTA       |
| RF-004 | Visualizar informações conta               | ALTA       |
| RF-005 | Marcar um horário para cortar cabelo       | ALTA       |
| RF-006 | Selecionar um barbeiro preferencial        | MÉDIA      |
| RF-007 | Visualizar perfil do babeiro               | BAIXA      |
| RF-008 | Visualizar portfolio de cortes do barbeiro | BAIXA      |
| RF-009 | Adicionar fotos no portfolio do barbeiro   | BAIXA      |
| RF-010 | Reagendar corte marcado                    | ALTA       |
| RF-011 | Fornecer feedback do corte e serviço       | MÉDIA      |
| RF-012 | Chat de interação usuário-barbeiro         | BAIXA      |
| RF-013 | Pedido de reagendamento                    | ALTA       |
| RF-014 | Visualizar todos os atendimentos do dia    | ALTA       |
| RF-015 | Emitir relatório de trabalho               | MÉDIA      |
| RF-016 | Premiar o barbeiro que se destacou mais    | BAIXA      |
| RF-017 | Transferir cliente para outro barbeiro     | MÉDIA      |



### Requisitos não Funcionais

| ID      | Descrição do Requisito                                       | Prioridade |
| ------- | ------------------------------------------------------------ | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA      |
| RNF-002 | Deve processar requisições do usuário em no máximo 4s        | BAIXA      |
| RNF-003 | Possuir disponibilidade 99.9                                 | ALTA       |
| RNF-004 | Usabilidade                                                  | MÉDIA      |
| RNF-005 | Portabilidade para navegadores mais comuns                   | ALTA       |
| RNF-006 | Restrito às leis da LGPD (Lei Geral de Proteção de Dados Pessoais) | ALTA       |



## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID   | Restrição                                                    |
| ---- | ------------------------------------------------------------ |
| 01   | O projeto deverá ser entregue até o final do semestre        |
| 02   | Não pode ser desenvolvido um módulo de backend               |
| 03   | Restringir atendimento para dias e horários úteis            |
| 04   | Pagamento é realizado no local de atendimento                |
| 05   | Um barbeiro não pode atender 2 ou mais clientes no mesmo horário |
| 06   | Reagendamento somente com antecedência de 2 horas            |
| 07   | Restringir atendimento especializado para barbeiro com competência |

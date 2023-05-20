# Especificações do Projeto

O Shaves é um sistema de agendamento para a barbearia Golden Hair que permitirá usuários realizarem um agendamento para corte de cabelo nos dias e horários disponíveis, com opções de escolher um barbeiro de preferência e visualizar informações do barbeiro, tais como a sua experiência, feedback de outros clientes e o portfólio dos cortes realizados. 

O Front-end do sistema deve ser desenvolvido com o HTML, CSS e Javascript, podendo ter o auxílio do Framework Boostrap. O Back-End será desenvolvido com o Javascript e com as operações CRUD realizadas por JSON.

## Personas

1 - Samuel Nogueira tem 30 anos, barbeiro há 10 anos e desde criança sempre foi muito competitivo. Os pais de Samuel sempre o incentivaram a fazer as coisas de forma bem feitas. Atualmente trabalha como barbeiro e tem como renda principal o mercado de investimentos. Já participou de diversos campeonatos de cortes masculinos.

2 - Enzo Ezaquiel tem 9 anos, vem de uma família de classe média alta, atualmente está no 3º ano do ensino fundamental. Enzo é muito acostumado a receber o que quer de imediato e se frustra facilmente quando é contrariado. Passa o dia inteiro no celular e tem o desejo de se tornar um jogador profissional de Free Fire. Enzo odeia estudar e ama comer doces e guloseimas.

3 - Yago Campos tem 36 anos, pai de duas meninas e divorciado. Ama praticar esportes e ser melhor que puder todos os dias. É apaixonado por futebol e joga desde criança. Uma das suas frustrações é pela sua queda de cabelo eminente e que não consegue achar um salão que te ajude a melhorar isso. Yago busca aumentar sua autoestima achando uma barbearia que o deixe satisfeito com a sua aparência.

4 - Washington Dias tem 27 anos, é barbeiro da barbearia Golden Hair e músico. Tem grande vaidade e procura ao máximo cuidar do seu corpo, ele possui grande aptidão para aprender novos instrumentos além dos que já possui conhecimento e tem como paixão a música. Washington gosta de sempre se reunir com seus amigos e tem bastante convivência com outros músicos desde a sua infância. Apesar de todas as qualidades, Washington tem um sério problema em não ser muito bem compreendido e tem isso como frustração.

5 - Roger Raffari tem 41 anos e é dono da barbearia Golden Hair, ele possui grande experiência no ramo, vem atuando na área a pelo menos dez anos e tem como objetivo e motivação sempre prestar um bom serviço aos seus clientes. Roger possui vida econômica ativa no mercado de investimentos e tem como hobbies jogar futebol, assim como também gosta de acompanhar enquanto toma uma cervejinha gelada. Apesar de dar seu máximo em prol da barbearia, Roger se sente um tanto quanto incapaz e odeia ser desorganizado, prezando sempre pela organização da barbearia e dos seus funcionários.

6 - Antônio Luiz tem 14 anos e é uma criança autista, o transtorno foi descoberto ainda quando criança. Antônio gosta de jogar videogame e sair para lugares calmos e não turbulentos, é muito amoroso com os pais mas odeia pessoas e lugares novos. Apesar do seu bom desempenho na escola é notável que ele odeia ir para aula, desde muito novo sua mãe nunca encontrou um barbeiro especializado para atendê-lo.

7 - Michael Fernandes tem 28 anos é barbeiro da Golden Hair a 3 anos, ele possui uma grande experiência no ramo da barbearia e é especializado em cortes de crianças com alguma necessidade especial. Além de seu serviço como barbeiro, Michael presta serviços comunitários sempre que pode, e ama se exercitar. Sempre que pode tenta evoluir na profissão mostrando total dedicação ao seu trabalho.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| EU COMO... `PERSONA`          | QUERO/PRECISO ... `FUNCIONALIDADE`                           | PARA ... `MOTIVO/VALOR`                                      |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Usuário do sistema            | Ver todos os serviços oferecidos pela barbearia e marcar um horário. | Quero ter a possibilidade de escolher entre diversos cortes e estilos de barba. |
| Usuário do sistema            | Escolher o barbeiro melhor capacitado, para o meu filho.     | Quero que meu filho se sinta bem com o seu cabelo.           |
| Usuário do sistema            | Marcar meus cortes de forma rápida e efetiva.                | Quero evitar filas e organizar melhor meus compromissos.     |
| Usuário do sistema            | Marcar meus cortes com um barbeiro específico.               | Quero cortar com meu barbeiro fixo.                          |
| Usuário do sistema            | Realizar o corte do meu filho com uma pessoa que tenha experiência com pessoas com deficiência (PCD). | Me sentir bem com o atendimento de uma pessoa que entenderá minhas dificuldades. |
| Usuário do sistema - Barbeiro | Ver os meus clientes do dia de forma organizada e postar meus cortes. | Manter a organização do meu dia e impulsionar minha carreira. |
| Usuário do sistema - Barbeiro | Ter a possibilidade de demonstrar meu conhecimento voltado para pessoas com deficiência (PCD). | Estar a disposição para ajudar pessoas que possuam alguma deficiência. |
| Administrador                 | Aumentar a produtividade dos barbeiros, e dar agilidade e organização para todos os clientes. | Impulsionar os ganhos da barbearia, melhor organização do ambiente de trabalho. |

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                       | Prioridade | Responsável     |
| ------ | ------------------------------------------------------------ | ---------- | --------------- |
| RF-001 | O Usuário deve conseguir criar uma conta com as informações pessoais necessárias | ALTA       | GUILHERME       |
| RF-002 | O Usuário deve conseguir alterar as informações pessoais da sua conta | ALTA       | GUILHERME       |
| RF-003 | O Usuário deve conseguir excluir a conta por completo após um período de confirmação da exclusão | ALTA       | GUILHERME       |
| RF-004 | O Usuário deve conseguir visualizar as informações pessoais da sua conta | ALTA       | GUILHERME       |
| RF-005 | O Usuário deve conseguir marcar um horário para cortar cabelo dentro do limite estabelecido de dia e horário útil de atendimento da barbearia | ALTA       | FELIPE FERREIRA |
| RF-006 | Ao selecionar um horário para o agendamento, o Usuário deve conseguir, opcionalmente, selecionar um Barbeiro de sua preferência | MÉDIA      | FELIPE FERREIRA |
| RF-007 | O Usuário deve conseguir visualizar o perfil do babeiro      | BAIXA      | MATHEUS         |
| RF-008 | O Usuário deve conseguir visualizar o portfólio de cortes do barbeiro | BAIXA      | MATHEUS         |
| RF-009 | O Barbeiro deve conseguir adicionar fotos no seu portfólio   | BAIXA      | MATHEUS         |
| RF-010 | O Barbeiro devem conseguir reagendar horário do corte marcado de determinado Usuário | ALTA       | MATHEUS         |
| RF-011 | O Usuário deve conseguir fornecer feedback do corte e serviço prestado pelo Barbeiro | MÉDIA      | GABRIEL AMORIM  |
| RF-012 | O Usuário deve conseguir se comunicar com o Barbeiro através de um Chat de interação | BAIXA      | GABRIEL AMORIM  |
| RF-013 | O Usuário deve conseguir realizar um pedido de reagendamento para o Barbeiro | ALTA       | GABRIEL AMORIM  |
| RF-014 | O Barbeiro deve conseguir visualizar todos os atendimentos marcados para o dia de trabalho | ALTA       | GABRIEL AMORIM  |
| RF-015 | O Administrador deve conseguir emitir um relatório de trabalho | MÉDIA      | BRUNO           |
| RF-016 | O Administrador deve conseguir premiar o Barbeiro que teve maior destaque no mês | BAIXA      | BRUNO           |
| RF-017 | O Barbeiro deve conseguir transferir um cliente para outro Barbeiro | MÉDIA      | MATHEUS         |
| RF-018 | O pagamento deve ser realizado no local de atendimento       | ALTA       | BRUNO           |
| RF-019 | Um Barbeiro não deve poder atender 2 ou mais clientes no mesmo horário | ALTA       | FELIPE FERREIRA |
| RF-020 | O reagendamento deve ser somente realizado com antecedência de 2 horas | ALTA       | GABRIEL AMORIM  |
| RF-021 | O atendimento especializado é restringindo apenas a um barbeiro com as competências necessárias | ALTA       | FELIPE FERREIRA |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                       | Prioridade |
| ------- | ------------------------------------------------------------ | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA      |
| RNF-002 | Deve processar requisições do usuário em no máximo 4s        | BAIXA      |
| RNF-003 | Possuir disponibilidade 99.9                                 | ALTA       |
| RNF-004 | Deve ser intuitivo e simples                                 | MÉDIA      |
| RNF-005 | Portabilidade para navegadores mais comuns                   | ALTA       |
| RNF-006 | Os usuários do sistemas só podem ter acesso às próprias informações pessoais | ALTA       |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID   | Restrição                                             |
| ---- | ----------------------------------------------------- |
| 01   | O projeto deverá ser entregue até o final do semestre |
| 02   | Não pode ser desenvolvido um módulo de backend        |

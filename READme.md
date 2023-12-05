# POC (Proof of Concept) - Arquitetura Limpa (Clean Arch)

  

## O que é o Arquitetura Limpa? :writing_hand:

De maneira simplificada, a Arquitetura Limpa é uma abordagem para desenvolver software que visa separar as preocupações e promover a manutenção e escalabilidade do sistema. Em sua essência, a arquitetura é organizada em camadas concêntricas, onde o núcleo central representa as regras de negócios fundamentais. Esse núcleo é circundado por anéis concêntricos de camadas, cada uma com responsabilidades específicas.

A camada mais interna contém as entidades e casos de uso que encapsulam a lógica de negócios pura. Em seguida, temos camadas que representam os detalhes técnicos, como interfaces de usuário, bancos de dados e serviços externos. As relações entre essas camadas são cuidadosamente projetadas para manter uma direção unidirecional, garantindo que as dependências fluam da camada externa para a interna.

As interfaces são definidas nas bordas de cada camada, criando contratos claros entre elas. Isso permite a substituição ou atualização de componentes externos sem afetar a lógica de negócios central. Além disso, são empregados adaptadores para converter as operações do núcleo em formatos compreendidos pelos componentes externos, mantendo a integridade do sistema.

Essa abordagem facilita a testabilidade, a manutenção e a evolução do software ao longo do tempo, uma vez que as mudanças em detalhes de implementação técnica não afetam a estabilidade do núcleo de negócios. Em resumo, a Arquitetura Limpa busca criar sistemas flexíveis, adaptáveis e fáceis de compreender, proporcionando uma base sólida para o desenvolvimento e aprimoramento contínuo do software.

## Visualização da Arquitetura :framed_picture:

<p align="center">
  <img src="https://www.zup.com.br/wp-content/uploads/2021/10/Clean-Architecture-5.png" height="450" alt="Imagem 1">
</p>

## Benefícios e Malefícios :raised_eyebrow:
### Benefícios:

1.  **Manutenção Facilitada:**
    
    -   **Benefício:** A separação clara de responsabilidades e a hierarquia bem definida facilitam a manutenção do código ao longo do tempo.
    -   **Explicação:** Mudanças em uma camada específica não devem afetar outras partes do sistema, o que torna as alterações mais seguras e previsíveis.
2.  **Testabilidade Aprimorada:**
    
    -   **Benefício:** A estrutura da Arquitetura Limpa incentiva o desenvolvimento de testes automatizados eficazes.
    -   **Explicação:** A lógica de negócios central, isolada em camadas internas, pode ser testada independentemente das camadas externas, melhorando a confiabilidade do software.
3.  **Independência de Frameworks:**
    
    -   **Benefício:** A arquitetura promove a independência de frameworks e bibliotecas específicos.
    -   **Explicação:** As decisões de implementação técnica estão nas camadas externas, permitindo a fácil substituição de frameworks sem afetar a lógica de negócios.
4.  **Adaptabilidade a Mudanças:**
    
    -   **Benefício:** A estrutura modular e flexível permite que o sistema se adapte mais facilmente a novos requisitos e evoluções tecnológicas.
    -   **Explicação:** A Arquitetura Limpa busca criar sistemas que não se tornem obsoletos rapidamente, proporcionando uma base sólida para mudanças futuras.

### Desafios:

1.  **Complexidade Inicial:**
    
    -   **Desafio:** Implementar a Arquitetura Limpa pode parecer mais complexo no início do projeto.
    -   **Explicação:** A definição clara de camadas e a aderência a princípios específicos podem demandar mais tempo e esforço inicialmente.
2.  **Curva de Aprendizado:**
    
    -   **Desafio:** A equipe pode enfrentar uma curva de aprendizado ao adotar a abordagem se não estiver familiarizada com seus princípios.
    -   **Explicação:** Compreender completamente a hierarquia e as relações entre as camadas pode exigir esforço inicial de treinamento.
3.  **Possível Overhead:**
    
    -   **Desafio:** Em alguns casos, a estruturação rigorosa pode levar a um overhead desnecessário.
    -   **Explicação:** Para projetos menores ou menos complexos, a aplicação estrita da Arquitetura Limpa pode parecer excessiva.
4.  **Decisões de Design Cruciais:**
    
    -   **Desafio:** Tomar decisões erradas no design da arquitetura pode ter implicações significativas.
    -   **Explicação:** Uma vez que a estrutura é estabelecida, pode ser desafiador corrigir decisões de design inadequadas sem reestruturação substancial.
	
## Mas então é a mesma coisa que [arquitetura hexagonal](https://github.com/gabsferrara/Hexagonal-POC/blob/main/READme.md)? :thinking:
Mesmo tendo termos frequentemente usados para descrever abordagens arquiteturais similares, eles podem ter interpretações ligeiramente diferentes dependendo dos autores. No entanto, geralmente, eles compartilham muitos conceitos chave e princípios. Para não ficar repetitivo, esmiuçarei com mais detalhes apenas as diferenças, mas para não deixar de citar, as principais semelhanças conceituais são, separação de responsabilidade, camadas concêntricas (núcleo central é a logica de negocio fundamental e é cercado pelos detalhes técnicos) e a independência de frameworks.

### Diferenças:

1.  **Terminologia:**
    
    -   **"Ports and Adapters":** Usa terminologia como "ports" para interfaces e "adapters" para componentes que implementam essas interfaces. É mais focado na ideia de definir contratos claros entre as diferentes partes do sistema.
    -   **"Clean Architecture":** Utiliza termos como "entidades", "use cases", "interface" e "frameworks" para descrever as diferentes partes da arquitetura. Coloca uma ênfase particular na separação de conceitos, como entidades e casos de uso, das implementações técnicas.
2.  **Ênfase em Regras de Negócios:**
    
    -   **"Ports and Adapters":** Coloca ênfase na definição clara de contratos (portas) e na implementação desses contratos (adaptadores), mas a ênfase na camada central pode variar.
    -   **"Clean Architecture":** Põe uma ênfase particular na separação da lógica de negócios do restante do sistema, garantindo que ela seja a parte mais independente e estável.
3.  **Detalhes de Implementação:**
    
    -   **"Ports and Adapters":** Pode ser interpretado de maneiras mais flexíveis em relação à estruturação interna das camadas externas, focando mais na definição clara de interfaces.
    -   **"Clean Architecture":** Propõe uma estruturação mais rígida com camadas específicas, como entidades, casos de uso, interfaces e frameworks, e define uma direção estrita de dependência.
4.  **Origens e Influências:**
    
    -   **"Ports and Adapters":** O termo é muitas vezes associado ao autor Alistair Cockburn e suas ideias sobre arquitetura hexagonal.
    -   **"Clean Architecture":** Associado a Robert C. Martin e seus princípios de design e arquitetura de software.

## Propósito e resumo da POC :mage:

A priori este repositório tem o intuito de servir como demonstração prática dos princípios da Clean Arch, utilizando também Notification Pattern.
O core da aplicação é simples, basicamente um CRUD sem o D feito em node, assim para startar a API utilize o comando ``npm run dev``

## Links úteis :globe_with_meridians:
- ### [Notification Pattern](https://martinfowler.com/eaaDev/Notification.html)
- ### [Blog Clean Coder - Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
	
## 
<p align="center">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--dq8RyO7j--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yni25eg5uo2wazf0rzns.jpeg" height="300" alt="Imagem 1">
</p>
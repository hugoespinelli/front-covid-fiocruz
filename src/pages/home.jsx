import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid container justifyContent="left">
        <Typography variant="h4" gutterBottom="true">Bem vindo ao projeto lncc/fiocruz!</Typography>
        <Grid container justifyContent="left">
          <Typography variant="caption" align="left" gutterBottom="true">
            <strong>Coordenador:</strong> Fabricio Alves <br />
            <strong>Pesquisadora:</strong> Vanessa Santos  <br />
            <strong>Áreas do Conhecimento:</strong> Ciência da computação; 
            Ciência da Saúde; Ciências biológicas <br />
            <strong>Áreas do Conhecimento:</strong> 04/12/2020
          </Typography>
          </Grid>
        <Typography variant="body1" align="left">
          Este projeto está atrelado ao Projeto Programa lnova FIOCRUZ - Geração
          de Conhecimênto - Enfrentamento da Pandemia e Pós-Pandemia Covid-19 -
          VPPCB-005-FlO-20-2-34 - Estudo das bases moleculares das comorbidades
          associadas ao desenvolvimento de COVID-19 grave - Uma abordagem de
          biologia de sistemas, coordenado pelo proponente. Para apoio no
          tratamento de pacientes graves cCIrn COVID-19, é preciso entender a
          intrincada correlação molecular da infecçâo causada pelo SAffiS-CoV-2
          com as commorbidades associadas à gravidade e seus tratamentos.
          <br />
          Pretendemos avançar na compreensão destes mecanismos através da
          modelagem computaclonal, utilizando algoritmos de aprendizado de
          máquina e análise de redes biológicas, analisando dados
          transcriptômicos e de proteoma de células humanas infectadas com
          SARS-CIV-2 para identificar os genes e proteínas associados à
          infecção. Esta análise fornecerá uma ampla visão geral das moléculas
          envolvidas na resposta inflamatória relacionada à COVID-19 grave e
          como elas podem estar relacionadas à infecção por SARS-CoV-2,
          considerando as comorbidades associadas à gravidade. 
          <br />
          A integração e análise deste complexo conjunto de informações irá gerar uma lista de
          fármacos (individuais ou combinados), candidatos ao reposicionamento,
          adequados aos diversos casos clínicos. Este projeto ocorrerá em cinco
          fases. Na Fase I, analisaremos os dados de transcriptoma e proteoma
          associados ao COVID-19 e comorbidades relacionadas, processando dados
          disponíveis na literatura e em bancos de dados públicos, usando o
          algoritmo MetaCell. A Fase II consiste na construção de redes de PPI
          associadas a genes e caracterizaçáo das vias que são afetadas pelo
          COVID-19 em diferentes tecidos. Na Fase III, utilizaremos redes
          neurais recorrentes (e.g., Hopfield paramétrico) para a reconstrução
          da paisagem epigenética relacionada ao COVID-19, com base em listas de
          genes. A Fase IV é a proposta de um algoritmo de identificação de
          alvos com base nos resultados das Fases I, II e III. A Fase V é a
          identificação de medicamentos aprovados ou experimentais associados
          aos alvos identificados, classificados em termos de toxicidade e
          expressão gênica.
        </Typography>
      </Grid>
    </>
  );
}

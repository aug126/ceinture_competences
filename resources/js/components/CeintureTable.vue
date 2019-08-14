<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="9">
        <v-simple-table :dense="true">
          <thead>
            <tr>
              <th class="text-left"></th>
              <th
                class="text-left"
                v-for="(colors, competence) in competenceObject"
                :key="competence"
              >{{competence}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ceintureEleveList" :key="item.name">
              <td>
                <strong>{{ item.name }}</strong>
              </td>
              <td
                v-for="(niveau, competence) in item.competences"
                :key="competence"
                :class="competenceObject[competence][niveau] + '--text'"
                @click="() => upLvl(item, competence)"
              >{{competence}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    upLvl(row, competence) {
      let maxLvl = this.competenceObject[competence].length - 1;
      let currentLvl = row.competences[competence];
      console.log(maxLvl, currentLvl);
      if (maxLvl > currentLvl) row.competences[competence] += 1;
    }
  },
  data() {
    return {
      competenceObject: {
        math: ["white", "yellow", "orange", "green", "red"],
        français: ["white", "yellow", "orange", "green", "red", "blue"],
        grammaire: ["white", "yellow", "orange", "green", "red", "blue"],
        conjugaison: ["white", "yellow", "orange", "green", "red", "blue"],
        orthographe: ["white", "yellow", "orange", "green", "red", "blue"],
        numération: ["white", "yellow", "orange", "green", "red", "blue"],
        calculsEcrits: ["white", "yellow", "orange", "green", "red", "blue"],
        mesures: ["white", "yellow", "orange", "green", "red", "blue"],
        géométrie: ["white", "yellow", "orange", "green", "red", "blue"]
      },
      ceintureEleveList: [
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjaaf",
          competences: {
            math: 3,
            français: 2,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdzjf",
          competences: {
            math: 4,
            français: 3,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsardjf",
          competences: {
            math: 1,
            français: 4,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsvvdjf",
          competences: {
            math: 2,
            français: 0,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        },
        {
          name: "mlqsdjf",
          competences: {
            math: 1,
            français: 5,
            grammaire: 3,
            conjugaison: 1,
            orthographe: 3,
            numération: 1,
            calculsEcrits: 4,
            mesures: 1,
            géométrie: 2
          }
        }
      ]
    };
  }
};
</script>
<template>
  <div>
    <v-card>
      <v-simple-table id="ceinture-table" :fixed-header="true" :height="tableHeight" :dense="true">
        <thead>
          <tr>
            <th>
              <v-btn small color="info" dark depressed>
                <v-icon>mdi-table-edit</v-icon>
              </v-btn>
            </th>
            <th class="border-right">
              <h4>2019</h4>
            </th>
            <th
              v-for="(colors, competence) in competenceObject"
              :key="competence"
              :class="{'border-right': competence === 'orthographe'}"
            >{{competence}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in ceintureEleveList" :key="item.name">
            <td>
              <strong>{{ item.numero }}</strong>
            </td>
            <td class="border-right">
              <strong>{{ item.name }}</strong>
            </td>
            <td
              v-for="(niveau, competence) in item.competences"
              :key="competence"
              :class="{'border-right': competence === 'orthographe'}"
              @click="() => upLvl(item, competence)"
            >
              <ceinture-type-2 :color="competenceObject[competence][niveau]"></ceinture-type-2>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
// import CeintureType1 from "../svg/ceinture-type-1";
import CeintureType2 from "./svg/ceinture-type-2";
// import CeintureType3 from "../svg/ceinture-type-3";
export default {
  components: {
    CeintureType2
  },
  methods: {
    upLvl(row, competence) {
      let maxLvl = this.competenceObject[competence].length - 1;
      let currentLvl = row.competences[competence];
      if (maxLvl > currentLvl) row.competences[competence] += 1;
    }
  },
  mounted() {
    this.tableHeight = document.body.clientHeight - 148;
  },
  data() {
    return {
      tableHeight: 0,
      competenceObject: {
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
          numero: 1,
          name: "Augustin",
          competences: {
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
          numero: 2,
          name: "Céline",
          competences: {
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
          numero: 3,
          name: "Autres enfants",
          competences: {
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
          numero: 4,
          name: "aad",
          competences: {
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
          numero: 5,
          name: "aae",
          competences: {
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
          numero: 6,
          name: "aaf",
          competences: {
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
          numero: 7,
          name: "aag",
          competences: {
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
          numero: 8,
          name: "aah",
          competences: {
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
          numero: 9,
          name: "aai",
          competences: {
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
          numero: 1,
          name: "aaj",
          competences: {
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
          numero: 1,
          name: "aak",
          competences: {
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
          numero: 1,
          name: "aal",
          competences: {
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
          numero: 1,
          name: "aam",
          competences: {
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
          numero: 1,
          name: "aan",
          competences: {
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
          numero: 1,
          name: "aao",
          competences: {
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
          numero: 1,
          name: "aap",
          competences: {
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
          numero: 1,
          name: "aaq",
          competences: {
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
          numero: 1,
          name: "aar",
          competences: {
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
          numero: 1,
          name: "aas",
          competences: {
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
          numero: 1,
          name: "aat",
          competences: {
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
          numero: 1,
          name: "aau",
          competences: {
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
          numero: 1,
          name: "aav",
          competences: {
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
          numero: 1,
          name: "aaw",
          competences: {
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
          numero: 1,
          name: "aax",
          competences: {
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
          numero: 1,
          name: "aay",
          competences: {
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
          numero: 1,
          name: "aaz",
          competences: {
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
          numero: 1,
          name: "aba",
          competences: {
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
          numero: 1,
          name: "abb",
          competences: {
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
          numero: 1,
          name: "abc",
          competences: {
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
          numero: 1,
          name: "abd",
          competences: {
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

<style lang="sass" scoped>
#ceinture-table
  th, td
    font-size: 1.2rem
    border-color: black
    text-align: center
    user-select: none
  .border-right
    border-right: 1px solid
</style>
<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="userEdit">
          <div class="row">
            <div class="flex md4 sm6 xs12">
              <va-input v-model="firstName" placeholder="First Name" />
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="lastName" placeholder="Last Name" />
            </div>

            <!-- <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="withIcon"
                  placeholder="Input With Icon"
                >
                  <va-icon
                    slot="prepend"
                    color="gray"
                    name="fa fa-envelope-o"
                  />
                </va-input>
              </div> -->
            <div class="flex md4 sm6 xs12">
              <va-input v-model="email" type="email" label="Email" success>
              </va-input>
            </div>

            <div class="flex md4 sm6 xs12">
              <va-input v-model="telephone" placeholder="Telephone" removable />
            </div>
            <!-- <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="wrongEmail"
                  type="email"
                  label="Email (Validated)"
                  error
                  :error-messages="errorMessages">
                </va-input>
              </div> -->
            <!-- <div class="flex md4 sm6 xs12">
                <va-input
                  v-model="withDescription"
                  placeholder="Text Input (with description)"
                  :messages="messages"
                />
              </div> -->
          </div>

          <va-button @click="btnSubmitConctac" color="success">
            {{ $t("buttons.success") }}</va-button
          >
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-elements",
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      telephone: null,
      isMale: true,

      userEdit: "User Edit",

      chosenCountry: "",
      simple: "",
      withIcon: "",
      withButton: "",
      withDescription: "",
      clearableText: "Vasili Savitski",
      successfulEmail: "andrei@dreamsupport.io",
      wrongEmail: "andrei@dreamsupport",
      messages: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
          "incididunt ut labore et dolore magna aliqua."
      ],
      errorMessages: ["Field should contain a valid email"],
      simpleOptions: [
        {
          id: 1,
          description: "First option"
        },
        {
          id: 2,
          description: "Second option"
        },
        {
          id: 3,
          description: "Third option"
        }
      ],
      simpleSelectModel: "",
      multiSelectModel: [],
      multiSelectCountriesModel: [],
      searchableSelectModel: "",
      multiSearchableSelectModel: [],
      radioSelectedOption: "option1",
      radioSelectedDisableOption: "option1",
      checkbox: {
        unselected: false,
        selected: true,
        readonly: true,
        disabled: true,
        error: false,
        errorMessages: true
      },
      toggles: {
        unselected: false,
        selected: true,
        disabled: true,
        small: false,
        large: false
      },
      datepicker: {
        simple: "2018-05-09",
        time: "2018-05-08 14:10",
        range: "2018-05-08 to 2018-05-23",
        disabled: "2018-05-09",
        multiple: "2018-04-25, 2018-04-27",
        customFirstDay: "2018-05-09",
        customDate: "2017-Dec-06"
      }
    };
  },

  created() {
    this.getContactList();
  },
  methods: {
    clear(field) {
      this[field] = "";
    },

    getContactList() {
      const userID = this.$session.get("userID");
      let config = {
        headers: {
          Authorization: "Bearer " + this.$session.get("accessToken"),
          // "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      };
      this.$axios
        .get(
          `${this.$apiURL}contactDetail/${this.$route.params.contactID}/${userID}`,
          config
        )

        .then(results => {
          if (results.status == 200) {
            this.firstName = results.data[0].firstName;
            this.lastName = results.data[0].lastName;
            this.telephone = results.data[0].telephone;
            this.email = results.data[0].email;
          }
        });
    },

    btnSubmitConctac() {
      const userID = this.$session.get("userID");

      let config = {
        headers: {
          Authorization: "Bearer " + this.$session.get("accessToken"),
          // "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        }
      };

      this.$axios
        .post(
          this.$apiURL + "contactUpdate",
          {
            userID: userID,
            contactID: parseInt(this.$route.params.contactID),
            firstName: this.firstName,
            lastName: this.lastName,
            telephone: this.telephone,
            email: this.email,
            editedBy: userID
            // password: this.password,
          },
          config
        )
        .then(results => {
          if (results.status == 200) {
            this.$router.push({ name: "contact-list" });
          } else {
            //
          }
        });
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>

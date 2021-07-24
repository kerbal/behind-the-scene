<template>
  <div id="bugs-errors-main" class="bugs-errors-main">
    <div class="bugs-errors-toolbar">
      <p class="bugs-errors-count">Total: {{ total }}</p>
      <div class="bugs-errors-buttons">
        <input class="bugs-errors-search-bar" :disabled="isLoading" placeholder="Search" />
        <div class="dropdown">
          <select
            class="bugs-errors-filter-date"
            v-model="filterDate"
            :disabled="isLoading"
            @change="onFilterDateChange"
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="7-days">Last 7 days</option>
            <option value="30-days">Last 30 days</option>
          </select>
        </div>
        <div class="dropdown">
          <select
            class="bugs-errors-filter-time"
            v-model="sort"
            :disabled="isLoading"
            @change="onSortChange"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
    <div class="bugs-errors-list">
      <table v-if="!isLoading">
        <thead>
          <td>Detail</td>
          <td class="text-center">Time</td>
          <td class="text-center">Browser</td>
        </thead>
        <tbody>
          <router-link
            class="table-item"
            tag="tr"
            :to="{ name: 'bugs-errors-detail', params: { bugId: error._id } }"
            v-for="error in errors"
            :key="error.id"
          >
            <td>
              <p>{{ error.name }}</p>
              <p>{{ error.message }}</p>
            </td>
            <td class="text-center">{{ formatDate(error.createdAt) }}</td>
            <td>
              <div class="error-browser">
                <img class="error-browser-icon" :src="getBrowserIcon(error.browserName)" />
                <p class="error-browser-name">
                  <!-- {{ getBrowserName(error.userAgent) }} -->
                  {{ error.browserName }}
                </p>
              </div>
            </td>
          </router-link>
        </tbody>
      </table>
      <div v-else class="loading-container">
        <svg
          class="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h
            4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="bugs-errors-pagination">
      <button @click="prev">
        <img src="../../../../assets/images/Arrow_left.svg" />
        <p class="p-left">Prev</p>
      </button>
      <button @click="next">
        <p class="p-right">Next</p>
        <img src="../../../../assets/images/Arrow_right.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import apiService from '../../../../utils/apiService';

export default Vue.extend({
  name: 'BugserrorsMain',
  methods: {
    async next() {
      if (this.page + 1 <= Math.ceil(this.total / 20)) {
        this.page += 1;
      }
      this.loadErrors();
    },
    async prev() {
      if (this.page - 1 > 0) {
        this.page -= 1;
      }
      this.loadErrors();
    },
    onSortChange() {
      this.loadErrors();
    },
    onFilterDateChange() {
      this.loadErrors();
    },
    onNextPage() {
      if (this.isLoading) {
        return;
      }
      this.page += 1;
      this.loadErrors();
    },
    onPrevPage() {
      if (this.page === 1 || this.isLoading) {
        return;
      }
      this.page -= 1;
      this.loadErrors();
    },
    async loadErrors() {
      this.isLoading = true;
      let from = null;
      let to = null;

      switch (this.filterDate) {
        case 'today':
          from = moment()
            .startOf('day')
            .toDate();
          to = moment()
            .endOf('day')
            .toDate();
          break;
        case '7-days':
          from = moment()
            .subtract(7, 'days')
            .startOf('day')
            .toDate();
          to = moment()
            .endOf('day')
            .toDate();
          break;
        case '30-days':
          from = moment()
            .subtract(30, 'days')
            .startOf('day')
            .toDate();
          to = moment()
            .endOf('day')
            .toDate();
          break;
        default:
      }

      const result = await apiService.get(
        `/api/projects/${this.$route.params.id}/errors?page=${this.page}&from=${from}&to=${to}&sort=${this.sort}`,
      );
      const {
        data: { count, errors },
      } = result;
      this.isLoading = false;
      this.errors = errors;
      this.total = count;
    },
    getBrowserIcon(browserName: string) {
      return `https://cdnjs.cloudflare.com/ajax/libs/browser-logos/69.0.4/${browserName.toLowerCase()}/${browserName.toLowerCase()}_48x48.png`;
    },
    formatDate(date: string) {
      return moment(date).format('hh:mm - MMM DD, YYYY');
    },
  },
  data() {
    return {
      page: 1,
      errors: [],
      sort: 'desc',
      total: 0,
      filterDate: 'all',
      isLoading: false,
    };
  },
  async created() {
    this.loadErrors();
  },
});
</script>

<style lang="scss" scoped>
.bugs-errors-main {
  @apply text-primary;
  padding: 24px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bugs-errors-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bugs-errors-buttons {
  display: flex;
}
.bugs-errors-search-bar {
  @apply border-primary;
  width: 420px;
  border-width: 1px;
  padding: 7px 16px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06),
    0px 0px 1px rgba(0, 0, 0, 0.04);
}
.bugs-errors-search-bar::placeholder {
  color: rgba(33, 77, 113, 0.5);
}
.bugs-errors-search-bar:focus {
  outline: 0;
}
.dropdown {
  @apply border-primary;
  border-radius: 50px;
  padding: 7px 16px;
  border-width: 1px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  margin-left: 16px;
}
select:focus {
  outline: 0;
}
.bugs-errors-count {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
}
.bugs-errors-list {
  margin-top: 20px;
  border: 1px solid rgba(33, 77, 113, 0.25);
  border-radius: 4px;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
table {
  width: 100%;
}
table thead,
table tr {
  border-bottom: 1px solid rgba(33, 77, 113, 0.25);
}
table tr:last-child {
  border-bottom-width: 0px;
}
td {
  padding: 8px 14px;
}
.table-item {
  cursor: pointer;
}
.error-browser {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
}
.error-browser-icon {
  width: 20px;
  height: 20px;
}
.error-browser-name {
  text-transform: capitalize;
  padding-left: 8px;
}
.bugs-errors-pagination {
  align-self: flex-end;
  margin-top: 20px;
  display: flex;
}
button {
  @apply text-primary;
  @apply bg-white;
  border: 1px solid #214d71;
  border-radius: 50px;
  display: flex;
  align-items: center;
  font-weight: 600;
  .p-left {
    padding-left: 8px;
  }
  .p-right {
    padding-right: 8px;
  }
}
.loading-container {
  position: inherit;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

import { applyPagination } from '../../utils/apply-pagination';
import { deepCopy } from '../../utils/deep-copy';
import { lms } from './data';

class LM_ManageApi {
  getLMs(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(lms);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((lm) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = lm.name.toLowerCase().includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple category options
        if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
          const categoryMatched = filters.category.includes(lm.category);

          if (!categoryMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(lm.status);

          if (!statusMatched) {
            return false;
          }
        }

        // Present only if filter required
        if (typeof filters.inStock !== 'undefined') {
          const stockMatched = lm.inStock === filters.inStock;

          if (!stockMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }
}

export const lm_manageApi = new LM_ManageApi();

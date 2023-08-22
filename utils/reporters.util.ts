import { createJson } from '@utils/util';
import { category, executor } from '@fixtures/types';

export function executor(data: executor) {
    createJson('./reports/allure-results/executor.json', JSON.stringify(data));
}

export function categories(data: category[]) {
    createJson('./reports/allure-results/categories.json', JSON.stringify(data));
}

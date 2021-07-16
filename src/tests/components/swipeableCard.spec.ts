// import { shallowMount } from 'ts-jest/utils';
import SwipeableCard from '@/components/SwipeableCard.vue';
import Vuex from 'vuex';
import { expect, it, describe } from '@jest/globals';
import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';

let wrapper: Wrapper<any>;

const Vue = createLocalVue();
Vue.use(Vuex);

describe('components > SwipeableCard.vue', () => {
  jest.useFakeTimers();

  beforeEach(() => {
    wrapper = shallowMount(SwipeableCard, {
      propsData: {
        cards: [{
          id: 1,
          employee_name: 'emp1',
          employee_email: 'emp1@gmail.com',
          employee_image_url: 'emp1',
          employee_alt_id: 'emp1',
          employee_organization: 'emp1',
          employee_organization_full_text: 'emp1',
          employee_business_unit: 'emp1',
          created_at: 'emp1',
          updated_at: 'emp1',
        }, {
          id: 2,
          employee_name: 'emp2',
          employee_email: 'emp2@gmail.com',
          employee_image_url: 'emp2',
          employee_alt_id: 'emp2',
          employee_organization: 'emp2',
          employee_organization_full_text: 'emp2',
          employee_business_unit: 'emp2',
          created_at: 'emp2',
          updated_at: 'emp2',
        }],
      },
      mocks: {
        $router: { push: jest.fn() },
        $route: {
          query: { callback: 'requirements' },
        },
      },
    });
  });

  // mounting component
  it('berhasil mounting komponen', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  it('Test currentComputed() & nextComputed() index', () => {
    wrapper.setData({ index: 1 });
    expect(wrapper.vm.next.employee_name).toBe('emp2');
  });

  it('Test match()', () => {
    expect(wrapper.vm.index).toBe(0);
    wrapper.vm.match();
    setTimeout(() => {
      expect(wrapper.vm.index).toBe(1);
      expect(wrapper.vm.selected.length).toBe(1);
    }, 500);
  });

  it('Test reject()', () => {
    expect(wrapper.vm.index).toBe(0);
    wrapper.vm.reject();
    setTimeout(() => {
      expect(wrapper.vm.index).toBe(1);
      expect(wrapper.vm.selected.length).toBe(1);
    }, 500);
  });

  it('Test checkWhitelist()', () => {
    wrapper.vm.checkWhitelist();
    expect(wrapper.vm.alert).toBe(false);

    wrapper.setData({ selected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] });
    wrapper.vm.checkWhitelist();
    expect(wrapper.vm.alert).toBe(false);
    expect(wrapper.vm.selected.length).toBe(11);

    wrapper.setData({ selected: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
    wrapper.vm.checkWhitelist();
    expect(wrapper.vm.alert).toBe(true);
    expect(wrapper.vm.selected.length).toBe(9);
  });

  it('Test emitAndNext()', () => {
    jest.useFakeTimers();
    wrapper.vm.emitAndNext('match');
    expect(wrapper.vm.btnDisabled).toBe(true);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    wrapper.vm.emitAndNext('reject');
    expect(setTimeout).toHaveBeenCalledTimes(4);
  });

  it('Test visibleTrue()', () => {
    wrapper.vm.visibleTrue();
    expect(wrapper.vm.index).toBe(1);
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.vm.btnDisabled).toBe(false);
  });

  it('Test visibleFalse()', () => {
    wrapper.vm.visibleFalse();
    expect(wrapper.vm.isVisible).toBe(false);
  });

  it('Test save()', () => {
    wrapper.vm.save();
  });
});

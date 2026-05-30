import { defaultTestModeType, TestModeType } from '@/services/service-types';

// Types
export const TEST_MODE_SET = "TEST_MODE_SET";
export const TEST_MODE_DELETE = "TEST_MODE_DELETE";

export type TestModeSet = {
    type: typeof TEST_MODE_SET;
    payload: TestModeType;
}

export type TestModeDelete = {
    type: typeof TEST_MODE_DELETE;
}

export type TestModeActionTypes = TestModeSet | TestModeDelete;

// Initial State
const INITIAL_STATE = defaultTestModeType();

// Reducer
export default function testModeReducer(state = INITIAL_STATE, action: TestModeActionTypes): TestModeType {
    switch (action.type) {
        case "TEST_MODE_SET":
            console.log("Updating TestMode in store.", action.payload);
            return { ...state, ...action.payload };
        case "TEST_MODE_DELETE":
            console.log("Removing TestMode from store.");
            return { ...state, ...INITIAL_STATE, mode: false };
        default:
            return state;
    }
}

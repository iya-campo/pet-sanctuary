// Cat is for practice only.

interface Cat {
  id: string;
  name: string;
  desc: string;
}

interface CatState {
  list: Cat[];
  loading: boolean;
  error: string | null;
}

const initialState: CatState = {
  list: [],
  loading: false,
  error: null,
};

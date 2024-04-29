import { get, set, del, keys } from "idb-keyval";

type Props = {
  key: string;
};

export async function getFromIndexedDb({ key }: Props) {
  try {
    if (!key) return;

    const cache = await get(key);

    if (cache) {
      return cache.data;
    }
  } catch (err) {
    console.log("Error while getting from indexedDb");
  }
}

export async function getAllFromIndexedDb() {
  try {
    const allKeys = await keys();
    const allRecords = [];

    for (const key of allKeys) {
      if (`${key}`.includes("Elagrade")) {
        const record = await get(key);
        if (record) {
          allRecords.push(record.data);
        }
      }
    }

    return allRecords;
  } catch (err) {
    console.log("Error while gettinf from indexedDb");
  }
}

export async function deleteAllFromIndexedDb() {
  try {
    const allKeys = await keys();

    for (const key of allKeys) {
      if (key) await del(key);
    }
    return true;
  } catch (err) {
    console.log("Error while deleting from indexedDb");
  }
}

export async function deleteFromIndexedDb({ key }: Props) {
  try {
    if (key) {
      await del(key);
    }
  } catch (err) {
    console.log("Error while deleting individual key from indexedDb");
  }
}

type SaveProps = {
  key: string;
  data: any;
};

export async function saveToIndexedDb({ key, data }: SaveProps) {
  if (!key) return;

  try {
    await set(key, { data });
    return data;
  } catch (error) {
    /* Handle any errors from the callback */
    console.error("Error saving data to indexedDb: ", error);
  }
}

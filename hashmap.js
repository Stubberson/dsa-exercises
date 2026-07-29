import { LinkedList } from './linked-list.js'

class HashMap {
    constructor() {
        this.capacity = 16
        this.loadFactor = 0.75
        this.buckets = []
    }

    hash(key) {
        let hashCode = 0

        const primeNumber = 31
        for (let i = 0; i < key.length; i++) {
            // '%' to avoid integer overflow for long keys
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity
        }

        return hashCode
    }
    
    set(key, value) {
        // Start with 16 buckets
        if (this.buckets.length === 0) {
            for (let i = 0; i < this.capacity; i++) {
                this.buckets.push(new LinkedList())
            }
        }
        
        const bucketList = this.buckets[this.hash(key)]
        if (!bucketList.headNode || !this.get(key)) {
            bucketList.append({ key, value })
        } else {
            // If the key exists, update its value
            for (let i = 0; i < bucketList.size(); i++) {
                if (bucketList.at(i).key === key) {
                    bucketList.at(i).value = value
                    return
                }
            }
        }

        // Double capacity at 75% load
        if (this.capacity * this.loadFactor < this.length()) {
            for (let i = 0; i < this.capacity; i++) {
                this.buckets.push(new LinkedList())
            }
            this.capacity *= 2
        }
    }

    // Return the value that is assigned to this key
    get(key) {
        const bucketList = this.buckets[this.hash(key)]
        for (let i = 0; i < bucketList.size(); i++) {
            if (bucketList.at(i).key === key) {
                return bucketList.at(i).value
            }
        }
        return null
    }

    // Return true or false based on whether or not the key is in the hash map
    has(key) {
        if (this.get(key)) {
            return true
        } else {
            return false
        }
    }

    // If key in map, remove the entry with key and return true
    remove(key) {
        if (!this.get(key)) {
            return false
        } else {
            const bucketList = this.buckets[this.hash(key)]
            for (let i = 0; i < bucketList.size(); i++) {
                if (bucketList.at(i).key === key) {
                    bucketList.removeAt(i)
                    return true
                }
            }
        }
    }

    // Return the number of entries
    length() {
        let total = 0
        for (let bucket of this.buckets) {
            if (bucket.headNode) {
                total += bucket.size()
            }
        }
        return total
    }

    // Remove all entries
    clear() {
        for (let bucket of this.buckets) {
            while (bucket.headNode) {
                bucket.pop()
            }
        }
    }

    // Return all keys
    keys() {
        let keysArray = []
        for (let bucket of this.buckets) {
            for (let i = 0; i < bucket.size(); i++) {
                keysArray.push(bucket.at(i).key)
            }
        }
        return keysArray
    }

    // Return all values
    values() {
        let valuesArray = []
        for (let bucket of this.buckets) {
            for (let i = 0; i < bucket.size(); i++) {
                valuesArray.push(bucket.at(i).value)
            }
        }
        return valuesArray
    }

    // Return all entries
    entries() {
        let entriesArray = []
        for (let bucket of this.buckets) {
            for (let i = 0; i < bucket.size(); i++) {
                entriesArray.push([bucket.at(i).key, bucket.at(i).value])
            }
        }
        return entriesArray
    }
}

const myMap = new HashMap()
myMap.set('apple', 'red')
myMap.set('banana', 'yellow')
myMap.set('carrot', 'orange')
myMap.set('dog', 'brown')
myMap.set('elephant', 'gray')
myMap.set('frog', 'green')
myMap.set('grape', 'purple')
myMap.set('hat', 'black')
myMap.set('ice cream', 'white')
myMap.set('jacket', 'blue')
myMap.set('kite', 'pink')
myMap.set('lion', 'golden')

console.log(myMap.length(), myMap.keys(), myMap.values(), myMap.entries())

// myMap.clear()

console.log(myMap)
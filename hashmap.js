import { LinkedList } from './linked-list.js'

class HashMap {
    constructor() {
        this.capacity = 16
        this.loadFactor = 0.75
        this.map = {}
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
        if (this.map[this.hash(key)] === undefined) {
            let newList = new LinkedList()
            newList.append({ key, value })
            this.map[this.hash(key)] = newList
        } else {
            // TODO: grow buckets when load factor is reached
            let bucketList = this.map[this.hash(key)].value
            if (bucketList === undefined || bucketList.contains({ key, value })) {
                return
            } else if (this.map.has(key)) {             // Else if the key already exists, update its value
                for (let i = 0; i < bucketList.size(); i++) {
                    if (bucketList.at(i).key === key) {
                        bucketList.at(i).value = value
                    }
                }
            } else { 
                bucketList.append({ key, value })       // Else append to the list
            }
        }
    }

    // Return the value that is assigned to this key
    get(key) {
        const bucketList = this.map[this.hash(key)]
        if (bucketList === undefined) return null
        for (let i = 0; i < bucketList.size(); i++) {
            if (bucketList.at(i).key === key) {
                return bucketList.at(i).value
            }
        }
        return null
    }

    // Return true or false based on whether or not the key is in the hash map
    has(key) {
        const bucketList = this.map[this.hash(key)]
        if (bucketList === undefined) return false
        for (let i = 0; i < bucketList.size(); i++) {
            if (bucketList.at(i).key === key) {
                return true
            }
        }
        return false
    }

    // If key in map, remove the entry with key and return true
    remove(key) {
        const bucketList = this.map[this.hash(key)]
        if (bucketList === undefined) return false
        for (let i = 0; i < bucketList.size(); i++) {
            console.log(bucketList.at(i).key)
            if (bucketList.at(i).key === key) {
                bucketList.removeAt(i)
                console.log(bucketList)
                if (bucketList.size() === 0) {
                    delete this.map[this.hash(key)]
                }
                return true
            }
        }
        return false
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

myMap.remove('jacket')

console.log(myMap, myMap.get('carrot'), myMap.has('arrot'), myMap.get('jacket'))
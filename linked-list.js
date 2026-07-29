export class LinkedList {
    constructor() {
        this.headNode = undefined
        this.type = 'LinkedList'
    }

    append(value) {
        // If list is empty, append === prepend
        if (this.headNode === undefined) {
            this.prepend(value)
        } else {
            let tmp = this.headNode
            // Traverse the list until the last node
            while (tmp.nextNode !== undefined) {
                tmp = tmp.nextNode
            }
            // Assign the last node's next node as the given node
            tmp.nextNode = new Node(value)
        }
    }

    prepend(value) {
        // Save the current head node
        const tmp = this.headNode
        // Assign the given node as the head and the previous head node as the following node
        this.headNode = new Node(value, tmp)
    }

    // Return the total number of nodes in the list
    size() {
        // Traverse and count
        let size = 0
        let tmp = this.headNode
        while (tmp !== undefined) {
            size++
            tmp = tmp.nextNode
        }
        return size
    }

    // Return the value of the first node
    head() {
        return this.headNode.value
    }

    // Return the value of the final node
    tail() {
        let tmp = this.headNode
        while (tmp.nextNode !== undefined) {
            tmp = tmp.nextNode
        }
        return tmp.value
    }

    // Return the value of the node at the given index
    at(index) {
        let tmp = this.headNode
        for (let i = 0; i < index; i++) {
            tmp = tmp.nextNode
        }
        
        if (tmp === undefined) return undefined
        else return tmp.value
    }

    // Remove the head node from the list and return its value
    pop() {
        if (this.headNode === undefined) {
            return undefined
        } else {
            const tmp = this.headNode
            // Reassign head node, effectively removing the previous head
            this.headNode = tmp.nextNode
            return tmp.value
        }
    }

    //  Return true if the passed value is in the list, otherwise return false
    contains(value) {
        let tmp = this.headNode
        while (tmp !== undefined && tmp.value != value) {
            tmp = tmp.nextNode
        }

        if (tmp === undefined) return false
        else return true
    }

    // Return the index of the node containing the given value
    // If the value can’t be found in the list, return -1
    // If more than one node has a value matching the given value, return the index of the first matching node
    findIndex(value) {
        if (!this.contains(value)) return -1
        else {
            let tmp = this.headNode
            let idx = 0
            // while-loop exits when the first match is found
            while (tmp.value !== value) {
                idx++
                tmp = tmp.nextNode
            }
            return idx
        }
    }

    // Return LinkedList as string representation: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        let tmp = this.headNode
        let string = ''
        if (tmp === undefined) return string
        else {
            while (tmp !== undefined) {
                string += `( ${tmp.value} ) -> `
                tmp = tmp.nextNode
            }
            string += 'null'
            return string
        }
    }

    // Insert new nodes with the given values at the given index
    insertAt(index, ...values) {
        if (index > this.size() || index < 0) throw RangeError

        let tmp = this.headNode
        
        if (index === 0) {
            // Insert values at index in "reverse" order
            for (let j = values.length - 1; j >= 0; j--) {
                tmp = new Node(values[j], tmp)
            }
            this.headNode = tmp
        } else {
            // Traverse until index - 1
            for (let i = 0; i < index - 1; i++) {
                tmp = tmp.nextNode
            }

            let indexNode = tmp.nextNode  //  Save the index node temporarily

            for (let j = values.length - 1; j >= 0; j--) {
                indexNode = new Node(values[j], indexNode)
            }

            // Restore the connection between (index - 1)-node and node at index
            tmp.nextNode = indexNode
        }
    }

    // Remove the node at the given index
    removeAt(index) {
        if (index >= this.size() || index < 0) throw RangeError

        if (index === 0) {
            this.headNode = this.headNode.nextNode
        } else {
            let tmp = this.headNode
            // Traverse until index - 1
            for (let i = 0; i < index - 1; i++) {
                tmp = tmp.nextNode
            }

            // Reassign the reference to go over the node at index, effectively removing the node
            tmp.nextNode = tmp.nextNode.nextNode
        }
    }
}

class Node {
    constructor(value = undefined, nextNode = undefined) {
        this.value = value
        this.nextNode = nextNode
    }
}

// const list = new LinkedList()
// list.prepend('dog')
// list.prepend('cat')
// list.append('dolphin')
// list.prepend('giraffe')
// list.insertAt(1, 'parrot', 'gorilla', 'rhino')
// list.removeAt(6)

// console.log(list.toString(), list.at(0), list.findIndex('giraffe'))
class Node {
    constructor(value = undefined, left = undefined, right = undefined) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(array) {
        // Sort and remove duplicates before building tree
        array = array.sort((a, b) => a - b).filter((val, idx, arr) => val !== arr[idx + 1])
        this.root = this.#buildTree(array)
    }

    // Private method that builds the bst and returns the root node
    #buildTree(array) {
        const lastIndex = array.length - 1
        if (0 > lastIndex) return null

        let midIndex = Math.floor(lastIndex / 2)

        const root = new Node(array[midIndex])
        root.left = this.#buildTree(array.slice(0, midIndex))
        root.right = this.#buildTree(array.slice(midIndex + 1))

        return root
    }

    // Return true if value is in the tree, else false
    includes(value) {
        let current = this.root
        while (current) {
            if (value === current.value) {
                return true
            } else if (value > current.value) {
                current = current.right
            } else {
                current = current.left
            }
        }
        return false
    }

    // Insert a new node into the tree. If value exists, do nothing
    insert(value) {
        if (this.includes(value)) return

        // Track parent to allow connecting new node with tree/parent
        let current = this.root
        let parent = null
        
        while (current) {
            parent = current
            if (value > current.value) {
                current = current.right
            } else {
                current = current.left
            }
        }

        value > parent.value  // Insert the node
            ? parent.right = new Node(value) 
            : parent.left = new Node(value)
    }

    // Remove node from the tree
    removeNode(value) {
        if (!this.includes(value)) return

        let current = this.root
        let parent = null
        
        while (current.value !== value) {
            parent = current
            if (value > current.value) {
                current = current.right
            } else {
                current = current.left
            }
        }

        let currentChildren = 0
        if (current.right) currentChildren++
        if (current.left) currentChildren++

        // If current has no children
        if (currentChildren === 0 && value > parent.value) {
            parent.right = null
        } else if (currentChildren === 0 && value < parent.value) {
            parent.left = null
        }

        // If current has 1 child
        if (currentChildren === 1 && value > parent.value) {
            current.right 
                ? parent.right = current.right 
                : parent.right = current.left
        } else if (currentChildren === 1 && value < parent.value) {
            current.right 
                ? parent.left = current.right 
                : parent.left = current.left
        }

        // If current has 2 children
        if (currentChildren === 2) {
            // Find in-order successor
            let successor = current.right
            // Closest successor is always a leaf with no left child
            while (successor.left) {
                successor = successor.left
            }
            // Replace 
            current.value = successor.value
            if (current.right.value === successor.value) {
                successor.right
                    ? current.right = successor.right
                    : current.right = null
            } else {
                // In case successor is not the immediate child
                let successorParent = current.right
                while (successorParent.left.value !== successor.value) {
                    successorParent = successorParent.left
                }
                successor.right
                    ? successorParent.left = successor.right
                    : successorParent.left = null
            }
        }
    }
}


// Helper function to print the tree nicely (given)
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`)
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
}


// [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

myTree.insert(10)
myTree.insert(1052)
myTree.insert(6)
myTree.insert(0)

prettyPrint(myTree.root)

myTree.removeNode(67)

prettyPrint(myTree.root)

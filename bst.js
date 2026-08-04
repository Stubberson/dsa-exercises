class Node {
    constructor(value = null, left = null, right = null) {
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
            while (successor.left) {
                successor = successor.left  // Closest successor is always a leaf with no left child
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

    // Breadth-first traversal, calling a callback on each value
    levelOrderForEach(callback) {
        if (!callback) {
            throw new Error('No callback given')
        }
        
        let queue = []  // Queue is FIFO
        queue.push(this.root)

        while (queue.length > 0) {
            let current = queue.shift()  // shift() to use as queue
            callback(current.value)
            if (current.left) queue.push(current.left)
            if (current.right) queue.push(current.right)
        }
    }

    // Depth-first traversal
    preOrderForEach(callback) {  // root -> left-branch -> right-branch
        if (!callback) {
            throw new Error('No callback given')
        }

        let stack = []  // Stack is FILO
        stack.push(this.root)

        while (stack.length > 0) {
            let current = stack.pop()  // pop(), instead of shift(), to use as stack
            callback(current.value)
            if (current.right) stack.push(current.right)
            if (current.left) stack.push(current.left)
        }
    }

    inOrderForEach(callback) {  // left -> root -> right
        if (!callback) {
            throw new Error('No callback given')
        }

        let stack = []
        let current = this.root
        
        while (stack.length > 0 || current) {  // Second condition is needed to enter the loop
            if (current) {
                stack.push(current)
                current = current.left
            } else {
                current = stack.pop()
                callback(current.value)
                current = current.right
            }
        }
    }
        
    postOrderForEach(callback) {  // left -> right -> root
        if (!callback) {
            throw new Error('No callback given')
        }

        let stack = []
        let current = this.root
        let parent = null
        let peekNode = null
        
        while (stack.length > 0 || current) {
            if (current) {
                stack.push(current)
                current = current.left
            } else {
                peekNode = stack[stack.length - 1]  // Don't pop the node yet, only "peek" at it
                if (peekNode.right && parent !== peekNode.right) {
                    current = peekNode.right
                } else {
                    callback(peekNode.value)
                    parent = stack.pop()
                }
            }
        }
    }

    // Return the height of the node containing the value
    // Height is defined as the number of edges in the longest path from that node to a leaf node
    height(value) {
        if (!this.includes(value)) return undefined

        let current = this.root

        // First, find node with value
        while (current.value !== value) {
            if (value > current.value) {
                current = current.right
            } else {
                current = current.left
            }
        }

        // Initialize a queue to traverse
        let queue = [current]
        let height = 0

        while (queue.length > 0) {
            // Traverse all nodes at the current level
            for (let i = 0; i < queue.length; i++) {
                let current = queue.shift()

                if (current.left) queue.push(current.left)
                if (current.right) queue.push(current.right)
            }

            // Increment height after traversing a level
            height++
        }

        return height - 1
    }

    // Return the depth of the node containing value
    // Depth is the number of edges in the path from node to root node
    depth(value) {
        if (!this.includes(value)) return undefined

        let current = this.root
        let depth = 0

        // Find node with value while counting depth
        while (current.value !== value) {
            if (value > current.value) {
                current = current.right
                depth++
            } else {
                current = current.left
                depth++
            }
        }

        return depth
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

console.log(myTree.depth(324))

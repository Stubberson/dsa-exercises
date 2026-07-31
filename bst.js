// be sure to always remove duplicate values or check for an existing value before inserting.

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

}

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
prettyPrint(myTree.root)
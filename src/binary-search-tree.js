const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	#root = null;

	root() {
		return this.#root;
	}

	add(data) {
		if (!this.#root) {
			this.#root = new Node(data);
		} else {
			const addChild = (node, val) => {
				if (val < node.data) {
					if (!node.left) {
						node.left = new Node(val);
					} else {
						addChild(node.left, val);
					}
				} else {
					if (!node.right) {
						node.right = new Node(val);
					} else {
						addChild(node.right, val);
					}
				}
			};

			addChild(this.#root, data);
		}
	}

	has(data) {
		const hasNode = (node, val) => {
			if (node.data === val) {
				return true;
			} else {
				if (val < node.data) {
					if (!node.left) {
						return false;
					} else {
						return hasNode(node.left, val);
					}
				} else {
					if (!node.right) {
						return false;
					} else {
						return hasNode(node.right, val);
					}
				}
			}
		};

		if (!this.#root) {
			return false;
		} else {
			return hasNode(this.#root, data);
		}
	}

	find(data) {
		const findNode = (node, val) => {
			if (node.data === val) {
				return node;
			} else {
				if (val < node.data) {
					if (!node.left) {
						return null;
					} else {
						return findNode(node.left, val);
					}
				} else {
					if (!node.right) {
						return null;
					} else {
						return findNode(node.right, val);
					}
				}
			}
		};

		if (!this.#root) {
			return null;
		} else {
			return findNode(this.#root, data);
		}
	}

	remove(data) {
		const removeNode = (node, parent, val) => {
			if (!node) return;

			if (node.data === val) {
				//delete leaf
				if (!node.left && !node.right) {
					if (node.data < parent.data) {
						parent.left = null;
					} else {
						parent.right = null;
					}
					return;
				}

				//has only left child
				if (!node.right) {
					if (node.data < parent.data) {
						parent.left = node.left;
					} else {
						parent.right = node.left;
					}
					return;
				}
				//has only right child
				if (!node.left) {
					if (node.data < parent.data) {
						parent.left = node.right;
					} else {
						parent.right = node.right;
					}
					return;
				}
				//has both child
				let maxLeft = this.max(node.left);
				let minRight = this.min(node.right);
				if (Math.abs(node.data - maxLeft) < Math.abs(node.data - minRight)) {
					this.remove(maxLeft);
					node.data = maxLeft;
				} else {
					this.remove(minRight);
					node.data = minRight;
				}
			} else {
				if (val < node.data) {
					if (node.left) {
						removeNode(node.left, node, val);
					}
				} else {
					if (node.right) {
						removeNode(node.right, node, val);
					}
				}
			}
		};

		if (this.#root) {
			if (this.#root.data === data) {
				let node = this.#root;
				let maxLeft = this.max(node.left);
				let minRight = this.min(node.right);
				if (Math.abs(node.data - maxLeft) < Math.abs(node.data - minRight)) {
					this.remove(maxLeft);
					node.data = maxLeft;
				} else {
					this.remove(minRight);
					node.data = minRight;
				}
			} else {
				if (data < this.#root.data) {
					removeNode(this.#root.left, this.#root, data);
				} else {
					removeNode(this.#root.right, this.#root, data);
				}
			}
		}
	}

	min(node = this.#root) {
		if (!this.#root) return null;
		if (node.left) {
			return this.min(node.left);
		} else {
			return node.data;
		}
	}

	max(node = this.#root) {
		if (!this.#root) return null;
		if (node.right) {
			return this.max(node.right);
		} else {
			return node.data;
		}
	}
}

module.exports = {
	BinarySearchTree,
};

const tree = new BinarySearchTree();
tree.add(2);
tree.add(7);
tree.add(1);
tree.add(8);
tree.add(4);
tree.add(32);
tree.add(12);
tree.add(14);
console.log(tree.find(8).data, 8);
console.log(tree.find(2).data, 2);
console.log(tree.find(32).data, 32);
console.log(tree.find(14).data, 14);

console.log(tree.root);

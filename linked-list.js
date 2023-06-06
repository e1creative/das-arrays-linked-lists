/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    // add our node to the linked list. there is no head, set the head, if there is no tail, set the tail
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
  }

  /** pop(): return & remove last item. */
  // a -> b -> c
  pop() {
    if (!this.head) {
      return null;
    } else {
      // need to traverse to get the 2nd to the last item
      let beforeNodeToRemove = null;
      let nodeToRemove = null;

      let currentNode = this.head;
      let currentIdx = 0;

      while (currentNode) {
        // console.log("idx " + currentIdx + " = s" + currentNode.val);

        if (currentIdx === this.length - 2) beforeNodeToRemove = currentNode;
        if (currentIdx === this.length - 1) nodeToRemove = currentNode;

        currentIdx++;
        currentNode = currentNode.next;
      }

      // our currentNode val will be the 2nd to the last val
      // beforeNodeToRemove.next = null;
      this.tail = beforeNodeToRemove;

      if (this.head == nodeToRemove) this.head = null;

      this.length--;
      return nodeToRemove.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) {
      return null;
    } else {
      const firstNode = this.head;
      // set the head to the to the next item
      this.head = this.head.next;

      if (this.tail == firstNode) this.tail = null;

      this.length--;
      return firstNode.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // can only remvoe at an idx within our linked list length
    if (idx > this.length) return "idx value out of range";

    if (!this.head) {
      return "null";
    } else {
      // traverse the list and break ouf of the while loop when currentIdx = idx
      let currentNode = this.head;
      let currentIdx = 0;
      while (currentNode) {
        // console.log("idx " + currentIdx + " = " + currentNode.val);

        if (currentIdx === idx) return currentNode.val;
        currentIdx++;
        currentNode = currentNode.next;
      }
      return null;
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // can only remvoe at an idx within our linked list length
    if (idx > this.length) return "idx value out of range";

    if (!this.head) {
      return null;
    } else {
      // traverse the list and break ouf of the while loop when currentIdx = idx
      let currentNode = this.head;
      let currentIdx = 0;
      while (currentNode) {
        // console.log("idx " + currentIdx + " = " + currentNode.val);

        if (currentIdx === idx) {
          currentNode.val = val;
          return;
        }

        currentIdx++;
        currentNode = currentNode.next;
      }
      return null;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // can only insert at an idx within our linked list length
    if (idx > this.length) return "idx value out of range";

    const newNode = new Node(val);
    if (!this.head && idx === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else {
      if (idx == this.length) this.tail = newNode;

      // traverse the list and break ouf of the while loop when currentIdx = idx
      let currentNode = this.head;
      let currentIdx = 0;
      while (currentNode) {
        // console.log("idx " + currentIdx + " = " + currentNode.val);

        // here we are at the idx before inserstion point
        if (currentIdx === idx - 1) {
          newNode.next = currentNode.next;
          currentNode.next = newNode;
          this.length++;
          return;
        }

        currentIdx++;
        currentNode = currentNode.next;
      }

      return null;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // can only remvoe at an idx within our linked list length
    if (idx > this.length) return "idx value out of range";

    if (!this.head) {
      return 0;
    } else {
      // traverse the list and break ouf of the while loop when currentIdx = idx
      let beforeNodeToRemove = null;
      let nodeToRemove = null;
      let afterNodeToRemove = null;

      let currentNode = this.head;
      let currentIdx = 0;
      while (currentNode) {
        // console.log("idx " + currentIdx + " = s" + currentNode.val);

        if (currentIdx === idx - 1) beforeNodeToRemove = currentNode;
        if (currentIdx === idx) nodeToRemove = currentNode;
        if (currentIdx === idx + 1) afterNodeToRemove = currentNode;

        currentIdx++;
        currentNode = currentNode.next;
      }

      // if there is no afterNode then the node we are removing is the tail
      if (!afterNodeToRemove) {
        // beforeNodeToRemove.next = null;
        this.tail = beforeNodeToRemove;
      } else {
        beforeNodeToRemove.next = afterNodeToRemove;
      }

      if (this.length == 1) {
        this.tail = null;
        this.head = null;
      }

      this.length--;
      return nodeToRemove;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    // traverse the entired linked list and add the vals then divide by length
    if (this.length === 0) {
      return 0;
    } else {
      if (typeof this.head.val === "number") {
        let total = 0;
        // traverse our list based on the lengths
        let currentNode = this.head;
        while (currentNode) {
          total = total + currentNode.val;
          currentNode = currentNode.next;
        }

        // average the total
        const average = total / this.length;

        console.log("average: ", average);

        return average;
      } else {
        return "ERROR: values need to be of type int or float";
      }
    }
  }
}

module.exports = LinkedList;

# POC for file storage with lightning network

## Overview
Files stored, verified and retrieved with lighning network as an incentive structure.  This would be similar to storj, filecoin or Safe Network, but without the need to have a specialized token.  With andvances in the lightning network, a suitable payment mechanism is now available, this project attempts to add an additional layer that would allow participating nodes to become storage nodes.  Any client wishing to store files can use one or many redunant storage nodes for their files.  The storage node is incentivized by receiving payment on upload, verification and retreival of files paid by the file owner via the lighning network.

A file can be stored encrypted or not allowing both private and public files.  The files will be referenced by hashes of the meta data.  Storage reference will be in the format of `USER_PUBKEY/(USER_HASH | FILE_PATH_HASH)`.  A user can update the file at a given location using the same reference.  This is accoplished by sending a `current` hash of the content with each upload and no need to create a new reference, the storage node just updates the content and current hash simultaineously.  The storage node verifies updates by checking the signature of the request against the user's public key.

A UI client can have independent folder structure that will not be identifiable by the `FILE_PATH_HASH` but can be recreated from locally stored metadata.

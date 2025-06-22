import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableRow, TableHead, TableBody, TableCell, TableHeader } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { UserContext } from '@/context/UserContext';
import { Link_DTO, Link_DTO_Create } from '@/types/link';
import { dateToHumanReadable } from '@/util/helpers';
import { API_URL } from '@/config';

export function Links() {
    const [links, setLinks] = useState([] as Link_DTO[]);
    const [newLink, setNewLink] = useState('')
    const { isLoggedIn } = useContext(UserContext)

    useEffect(() => {
        const fetchLinks = async () => {
            // If not logged in, check local storage for links
            if (!isLoggedIn) {
                const storedLinks = localStorage.getItem('links')
                if (storedLinks) {
                    setLinks(JSON.parse(storedLinks))
                    return;
                }
            }
            // Simulate fetching data
            const fetchedLinks: Link_DTO[] = [
                // { id: 1, short: "http://link.jucaza.dev/1", url: 'https://example.com', description: 'Example Link' },
                // { id: 2, short: "http://link.jucaza.dev/2", url: 'https://another-example.com', description: 'Another Example' }
                {
                    short: "http://link.jucaza.dev/1",
                    url: 'https://example.com......................................................................................................................',
                    status: true,
                    userID: isLoggedIn ? 'user123' : null, // Mocked user ID
                    createdAt: new Date().toISOString(),
                    expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                }, {
                    short: "http://link.jucaza.dev/2",
                    url: 'https://another-example.com',
                    status: true,
                    userID: isLoggedIn ? 'user123' : null, // Mocked user ID
                    createdAt: new Date().toISOString(),
                    expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                }
            ]
            setLinks(fetchedLinks)
        }
        fetchLinks()
    }, [isLoggedIn])

    const handleAddLink = () => {
        if (!newLink) {
            toast.error('Please enter a link')
            return
        }
        // SEnd to the SERVER
        // Post and response will be stored

        async function postLink(link: Link_DTO_Create) {
            // Simulate a POST request to the server
            // In a real application, you would use fetch or axios to send the data to your backend
            // if we are logged we send to the guest endpoint otherwise to the link post endpoint
            let response;
            try {
                response = await fetch(`${API_URL}${isLoggedIn ? '/api/links' : '/api/guest-links'}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(link),
                })
            } catch (error) {
                console.error('Error posting link:', error);
                toast.error('Failed to add link. Please try again.');
                return;
            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json() as Link_DTO;
            setLinks(prevLinks => [...prevLinks, data]);
            console.log('Posting link:', link);
            const newLinkObj: Link_DTO = {
                short: `http://link.jucaza.dev/${links.length + 1}`, // Mocked short link
                url: newLink,
                status: true,
                userID: isLoggedIn ? 'user123' : null, // Mocked user ID
                createdAt: new Date().toISOString(),
                expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            }
            setLinks([...links, newLinkObj])
            setNewLink('')
            if (!isLoggedIn) {
                localStorage.setItem('links', JSON.stringify([...links, newLinkObj]))
                toast.success('Link added successfully (saved locally)')
                return
            }
            toast.success('Link added successfully')
            return new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        }
        postLink({ url: newLink }).catch((e) => {
            console.error('Error posting link:', e);
            toast.error('Failed to add link. Please try again.');
            return;
        })
    }

    return (
        <>
            {/*
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white shadow-md mx-auto h-full">
            */}
            <main className="flex flex-col items-center h-full">
                <h1 className="text-2xl font-bold mb-4">Your Links</h1>
                <div className="mb-6">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Enter a new link"
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            className="mb-2 bg-gray-100"
                        />
                        <Button onClick={handleAddLink}>Add Link</Button>
                    </div>
                </div>
                {/* add padding left to each tablecell*/}
                <Table className="shadow-md shadow-black rounded-md max-w-11/12 mx-auto my-4 w-full text-center">
                    <TableHeader className="bg-gray-200 text-center">
                        <TableRow className="bg-gray-200">
                            <TableHead className="">SHORT</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">URL</TableHead>
                            <TableHead className="">Created At</TableHead>
                            <TableHead className="">Expires At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.length ? (
                            links.map((link) => (
                                <TableRow key={link.short}>
                                    <TableCell className="">
                                        {link.short}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="ml-5"
                                            onClick={() => {
                                                navigator.clipboard.writeText(link.short);
                                                toast.success('Short link copied to clipboard');
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </TableCell>
                                    <TableCell className="">
                                        {link.status ?
                                            (
                                                <div className="flex items-center justify-center">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    Inactive
                                                </div>
                                            )}
                                    </TableCell>
                                    <TableCell className="max-w-52 overflow-auto overflow-y-hidden">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            {link.url}
                                        </a>
                                    </TableCell>
                                    <TableCell className="">{dateToHumanReadable(link.createdAt)}</TableCell>
                                    <TableCell className="">{dateToHumanReadable(link.expiresAt)}</TableCell>
                                    {/* Lest put a mini button to copy to the clipboard on click*/}
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </main>
            {/*
        </div>
            */}
        </>

    );
}
